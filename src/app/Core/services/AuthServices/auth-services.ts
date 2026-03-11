import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthServices {

  constructor(private http:HttpClient){}
  userData:any=null;
    private readonly router=inject(Router)


  BaseUrl = "https://ourtholandadmin.runasp.net"
createAdmin(data:any){
  return this.http.post(
    "https://ourtholandadmin.runasp.net/CreateAdmin",
    data
  );
}



  login(userName: string, password: string): Observable<boolean> {

    const params = new HttpParams()
      .set('UserName', userName)
      .set('Password', password);

    return this.http.post<boolean>(
      `${this.BaseUrl}/AdminLogin`,
      {},
      { params }
    );

  }

  

}

