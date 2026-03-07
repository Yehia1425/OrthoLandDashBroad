import { Component, inject, WritableSignal } from '@angular/core';
import { ProductServices } from '../../Core/services/ProductServices/product-services';
import { IProductSForOffers } from '../../Shared/Interface/iproduct-sfor-offers';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  private readonly productServices=inject(ProductServices);
  private readonly ToastrService=inject(ToastrService);

productForm:FormGroup = new FormGroup({
  name:new FormControl(''),
  description:new FormControl(''),
  price:new FormControl(''),
  rate:new FormControl(''),
  stock:new FormControl(''),
  categoryId:new FormControl(''),
  picture1:new FormControl(''),
  picture2:new FormControl(''),
  picture3:new FormControl('')
})



  CreateProduct(product:IProductSForOffers):void{
   this.productServices.CreateProduct(product).subscribe({
      next:(response)=>{
        console.log(response);
        this.ToastrService.success("Create Product","Create Product Succefully")
      },
      error:(error)=>{
        console.log(error);
         this.ToastrService.error("Create Fail","Create Falid")
      }
   })
  }


  submitProduct():void{

const product:IProductSForOffers = {
  name:this.productForm.value.name,
  description:this.productForm.value.description,
  price:this.productForm.value.price,
  rate:this.productForm.value.rate,
  stock:this.productForm.value.stock,
  categoryId:this.productForm.value.categoryId,
  PicturesUrls:[
    this.productForm.value.picture1,
    this.productForm.value.picture2,
    this.productForm.value.picture3
  ]
}

this.CreateProduct(product)

}



}
