import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../../../Shared/Interface/icategories';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesandCategories {

  constructor(private readonly http:HttpClient){}

  
    GetProductById(id:number):Observable<any>{
      return this.http.get(`https://ourtholand.runasp.net/GetProductById/${id}`);
    }

    GetGetProductsByCategoryId(id:any):Observable<any>{
      return this.http.get(`https://ourtholand.runasp.net/GetProductsByCategoryId/${id}`);
    }
  GetAllCategories(): Observable<ICategories[]> {
  return this.http.get<ICategories[]>('https://ourtholand.runasp.net/GetCategories');
}
}
