import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer } from '../../../Shared/Interface/ioffer';

@Injectable({
  providedIn: 'root',
})
export class OfferServices {
  
  constructor(private http:HttpClient){}

  CreateOffer(Offers:IOffer):Observable<any>{
return this.http.post(`http://ourtholandadmin.runasp.net/CreateOffer`,Offers)
  }
}
