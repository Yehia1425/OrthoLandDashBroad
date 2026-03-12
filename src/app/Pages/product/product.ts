import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductServices } from '../../Core/services/ProductServices/product-services';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { IProductSForOffers } from '../../Shared/Interface/iproduct-sfor-offers';
import { ICategories } from '../../Shared/Interface/icategories';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from '../../Core/services/AttachmentService/attachment-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  private readonly productServices = inject(ProductServices);
  private readonly categoriesService = inject(ProductServicesandCategories);
  private readonly toastr = inject(ToastrService);
  private readonly attachmentService = inject(AttachmentService);

  categories: WritableSignal<ICategories[]> = signal([]);

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    rate: new FormControl(''),
    stock: new FormControl(''),
    categoryId: new FormControl(''),

    size: new FormControl(''),
    color: new FormControl(''),
    type: new FormControl(''),

    picture1: new FormControl(''),
    picture2: new FormControl(''),
    picture3: new FormControl(''),
    picture4: new FormControl(''),
    picture5: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.GetAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  uploadImage(event: any, controlName: string): void {

    const file = event.target.files[0];
    if (!file) return;

    const newFileName = file.name.replace(/\s+/g, '_');

    const renamedFile = new File([file], newFileName, {
      type: file.type
    });

    this.attachmentService.uploadImage(renamedFile).subscribe({

      next: () => {

        this.productForm.get(controlName)?.setValue(newFileName);

        this.toastr.success("Image Uploaded Successfully");

      },

      error: (err) => {
        console.log(err);
        this.toastr.error("Upload Failed");
      }

    });

  }

  CreateProduct(product: IProductSForOffers): void {
    this.productServices.CreateProduct(product).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success("Create Product Successfully");
        this.productForm.reset();
      },
      error: (error) => {
        console.log(error.error);
        this.toastr.error("Create Product Failed");
      }
    });
  }

  submitProduct(): void {

    const pictures = [
      this.productForm.value.picture1,
      this.productForm.value.picture2,
      this.productForm.value.picture3,
      this.productForm.value.picture4,
      this.productForm.value.picture5
    ].filter((x: string) => x);

    const product: IProductSForOffers = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      rate: this.productForm.value.rate,
      stock: this.productForm.value.stock,
      categoryId: this.productForm.value.categoryId,
      size: this.productForm.value.size,
      color: this.productForm.value.color,
      type: this.productForm.value.type,
      PicturesUrls: pictures
    };

    this.CreateProduct(product);

  }

}