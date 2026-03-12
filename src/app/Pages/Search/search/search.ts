import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ISearchProduct } from '../../../Shared/Interface/isearch-product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  private readonly toastr = inject(ToastrService);

  BaseUrl = "https://ourtholand.runasp.net";

  products: ISearchProduct[] = [];

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  searchProducts(search: string){
    return this.http.get<ISearchProduct[]>(
      `https://ourtholandadmin.runasp.net/GetProductsBySearch?search=${search}`
    );
  }

  // مسار الصورة
  getImageUrl(img: string | null | undefined) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_');

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

  onSearch(){

    const value = this.searchForm.get('search')?.value?.trim();

    if(value){

      this.searchProducts(value).subscribe({

        next:(res)=>{
          console.log(res);
          this.products = res;
          this.toastr.success("Search Successfully","Search Products");
        },

        error:(error)=>{
          console.log(error.error);
          this.toastr.error("Search Failed","Search Products");
        }

      });

    }

  }

}