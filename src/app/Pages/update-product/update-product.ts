import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct {
  private readonly ToastrService=inject(ToastrService);


    BaseUrl = "http://ourtholandadmin.runasp.net";
 updateProductForm = new FormGroup({
    id: new FormControl(''),
    price: new FormControl(''),
    categoryId: new FormControl(''),
    stock: new FormControl(''),
    description: new FormControl(''),
    rate: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  updateProduct() {

    const id = this.updateProductForm.value.id;

    const body = {
      price: this.updateProductForm.value.price,
      categoryId: this.updateProductForm.value.categoryId,
      stock: this.updateProductForm.value.stock,
      description: this.updateProductForm.value.description,
      rate: this.updateProductForm.value.rate
    };

    this.http.put(`${this.BaseUrl}/UpdateProduct/${id}`, body)
      .subscribe(res => {
        console.log("Product Updated", res);
              this.ToastrService.success("Update Product","Update Product Succefully")

              if(res === false){
                this.ToastrService.error("Update Fail","Update Falid")
              }
      });

  }

}
