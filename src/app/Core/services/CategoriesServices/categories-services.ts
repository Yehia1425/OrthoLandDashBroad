import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriesCreate } from '../../../Shared/Interface/icategories-create';

@Injectable({
  providedIn: 'root',
})
export class CategoriesServices {

    constructor( private http:HttpClient){}

  CreateCategories(categories:ICategoriesCreate):Observable<any>{
    return this.http.post(`https://ourtholandadmin.runasp.net/CreateCategory`, categories);
  }


  
  
}
