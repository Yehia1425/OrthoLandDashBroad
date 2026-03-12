import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategories } from '../../Shared/Interface/icategories';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories-sp',
  imports: [RouterLink],
  templateUrl: './categories-sp.html',
  styleUrl: './categories-sp.css',
})
export class CategoriesSp implements OnInit {

  private readonly ProductServices = inject(ProductServicesandCategories);

  categories: WritableSignal<ICategories[]> = signal([]);

  products: any[] = [];

  BaseUrl = "https://ourtholand.runasp.net";

  ngOnInit(): void {
    this.GetAllProduct();
  }

  GetAllProduct(): void {
    this.ProductServices.GetAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  GetProductByCategoriesForAllProduct(id:number):void
  {
    this.ProductServices.GetGetProductsByCategoryId(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // نفس منطق ProductSp بالضبط
  getImageUrl(img: string | null | undefined) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_').split('/').pop();

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;

  }

}