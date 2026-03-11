import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { IProduct } from '../../Shared/Interface/iproduct';

@Component({
  selector: 'app-product-sp',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product-sp.html',
  styleUrl: './product-sp.css',
})
export class ProductSp {

  private productService = inject(ProductServicesandCategories);
  private route = inject(ActivatedRoute);

  BaseUrl = "https://ourtholand.runasp.net";

  products = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);

  searchControl = new FormControl('');

getImageUrl(img: string) {

  if (!img) return '';

  const cleanName = img.replace(/\s+/g, '_');

  return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (!id) {
        console.error('Category id not found');
        return;
      }

      this.loadProducts(Number(id));

    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {

        const search = value?.toLowerCase() || '';

        const filtered = this.products().filter(p =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );

        this.filteredProducts.set(filtered);

      });

  }

  loadProducts(id: number): void {

    this.productService.GetGetProductsByCategoryId(id).subscribe({
      next: (res: IProduct[]) => {

        const sortedProducts = res.sort((a,b)=> b.rate - a.rate);

        this.products.set(sortedProducts);
        this.filteredProducts.set(sortedProducts);

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}
