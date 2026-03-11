import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { ICategories } from '../../Shared/Interface/icategories';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-deleteproduct',
standalone: true,
imports: [ReactiveFormsModule, RouterLink, CommonModule],
templateUrl: './deleteproduct.html',
styleUrl: './deleteproduct.css',
})
export class Deleteproduct implements OnInit {

constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

private readonly toastr = inject(ToastrService);
private readonly productService = inject(ProductServicesandCategories);

BaseUrl = "https://ourtholandadmin.runasp.net";

categories: ICategories[] = [];
products: any[] = [];
selectedProduct: any = null;

deleteForm = new FormGroup({
categoryId: new FormControl<number | null>(null),
productId: new FormControl<number | null>(null)
});

ngOnInit(){
this.getCategories();
}

getCategories(){

this.productService.GetAllCategories().subscribe({

next:(res)=>{
this.categories = res;
this.cd.detectChanges();
},

error:(err)=>{
console.log(err);
}

})

}

getProductsByCategory(){

const categoryId = this.deleteForm.value.categoryId;

if(!categoryId) return;

this.productService.GetGetProductsByCategoryId(categoryId).subscribe({

next:(res)=>{
this.products = res;
this.cd.detectChanges();
},

error:(err)=>{
console.log(err);
}

})

}

getProduct(){

const productId = this.deleteForm.value.productId;

if(!productId) return;

this.productService.GetProductById(productId).subscribe({

next:(res)=>{
this.selectedProduct = res;
this.cd.detectChanges();
},

error:(err)=>{
console.log(err);
}

})

}

deleteProduct(){

const id = this.deleteForm.value.productId;

if(!id){
this.toastr.error("Select Product First");
return;
}

this.http.delete(`${this.BaseUrl}/DeleteProduct/${id}`)
.subscribe({

next: (res) => {

console.log("Product Deleted", res);

this.toastr.success("Delete Product Successfully");

// حذف المنتج من القائمة
this.products = this.products.filter(p => p.id !== id);

this.selectedProduct = null;

this.deleteForm.reset();

this.cd.detectChanges();

},

error: (err) => {

console.error("Delete Failed", err);

this.toastr.error("Delete Product Failed");

}

});

}

}