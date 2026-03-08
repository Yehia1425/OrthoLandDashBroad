import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-deleteproduct',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './deleteproduct.html',
  styleUrl: './deleteproduct.css',
})
export class Deleteproduct {

  private readonly ToastrService=inject(ToastrService);





  constructor(private http: HttpClient) {}
   BaseUrl = "http://ourtholandadmin.runasp.net";


  deleteForm = new FormGroup({
    id: new FormControl('')
  });



  deleteProduct(){

    const id = this.deleteForm.value.id;

    this.http.delete(`${this.BaseUrl}/DeleteProduct/${id}`)
    .subscribe(res=>{
      console.log("Product Deleted",res);
      this.ToastrService.success("Delete Product","Delete Product Succefully")

    });

  }

}








