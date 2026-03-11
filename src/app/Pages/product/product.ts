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
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  private readonly productServices = inject(ProductServices);
  private readonly categoriesService = inject(ProductServicesandCategories);
  private readonly ToastrService = inject(ToastrService);
  private readonly attachmentService = inject(AttachmentService);

  categories: WritableSignal<ICategories[]> = signal([]);

  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    rate: new FormControl(''),
    stock: new FormControl(''),
    categoryId: new FormControl(''),
    picture1: new FormControl(''),
    picture2: new FormControl(''),
    picture3: new FormControl('')
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

  // تغيير اسم الملف واستبدال المسافات بـ _
  const newFileName = file.name.replace(/\s+/g, '_');

  const renamedFile = new File([file], newFileName, {
    type: file.type
  });

  this.attachmentService.uploadImage(renamedFile).subscribe({

    next: (res) => {

      const fileName = newFileName;

      this.productForm.get(controlName)?.setValue(fileName);

      console.log("Image Name:", fileName);

      this.ToastrService.success("Image Uploaded");

    },

    error: (err) => {
      console.log(err);
      this.ToastrService.error("Upload Failed");
    }

  });

}

  CreateProduct(product: IProductSForOffers): void {
    this.productServices.CreateProduct(product).subscribe({
      next: (response) => {
        console.log(response);
        this.ToastrService.success("Create Product", "Create Product Successfully");
      },
      error: (error) => {
        console.log(error.error);
        this.ToastrService.error("Create Fail", "Create Failed");
      }
    });
  }

  submitProduct(): void {

    const product: IProductSForOffers = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      rate: this.productForm.value.rate,
      stock: this.productForm.value.stock,
      categoryId: this.productForm.value.categoryId,
      PicturesUrls: [
        this.productForm.value.picture1,
        this.productForm.value.picture2,
        this.productForm.value.picture3
      ]
    };

    this.CreateProduct(product);

  }

}