import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductSForOffers } from '../../../Shared/Interface/iproduct-sfor-offers';
import { IUpdateProduct } from '../../../Shared/Interface/iupdate-product';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
    constructor(private httpClient: HttpClient) {}




  CreateProduct(product:IProductSForOffers):Observable<any>{
    return this.httpClient.post(`https://ourtholandadmin.runasp.net/CreateProduct`,product);
  }

UpdateProduct(id:number , product:IUpdateProduct):Observable<any>{

  return this.httpClient.put(
    `https://ourtholandadmin.runasp.net/UpdateProduct/${id}`,
    product
  )

  

}
}
