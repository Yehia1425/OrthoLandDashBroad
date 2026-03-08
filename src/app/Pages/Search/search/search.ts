import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ISearchProduct } from '../../../Shared/Interface/isearch-product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private readonly ToastrService=inject(ToastrService);

  BaseUrl = "http://ourtholandadmin.runasp.net";

  products: ISearchProduct[] = [];

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  searchProducts(search: string){
    return this.http.get<ISearchProduct[]>(
      `${this.BaseUrl}/GetProductsBySearch?search=${search}`
    );
  }

  onSearch(){

    const value = this.searchForm.value.search;

    if(value){

      this.searchProducts(value).subscribe({

        next:(res)=>{
          this.ToastrService.success("Create Product","Create Product Succefully")
          // تصليح روابط الصور
          this.products = res.map(p => ({
            ...p,
            picturesUrls: p.picturesUrls.map(img =>
              img.replace('runasp.netimages','runasp.net/images')
            )

            
          }));

        },
      error:(error)=>{
        console.log(error.error);
         this.ToastrService.error("Create Fail","Create Falid")
      }

      });

    }

  }

}