import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IViewOrder } from '../../Shared/Interface/iview-order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-order.html',
  styleUrl: './view-order.css',
})
export class ViewOrder {

  BaseUrl = "https://ourtholandadmin.runasp.net";

  orders: WritableSignal<IViewOrder[]> = signal([]);

  viewOrdersForm = new FormGroup({
    startFrom: new FormControl(''),
    notConfirmedOnly: new FormControl(false)
  });

  constructor(private http: HttpClient) {}

  private readonly toastr = inject(ToastrService);

  getOrders(){

    const startFrom = this.viewOrdersForm.value.startFrom;
    const notConfirmedOnly = this.viewOrdersForm.value.notConfirmedOnly;

    this.http.get<IViewOrder[]>(`${this.BaseUrl}/ViewOrders?startFrom=${startFrom}&notConfirmedOnly=${notConfirmedOnly}`)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.orders.set(res);
        this.toastr.success("Orders Loaded Successfully","View Orders");
      },
      error:(err)=>{
        console.log(err.error);
        this.toastr.error("Failed To Load Orders","View Orders");
      }
    });

  }

  confirmOrder(id:number){

    this.http.put(`${this.BaseUrl}/ConfirmOrder/${id}`, {})
    .subscribe({
      next:(res)=>{
        console.log("Order Confirmed",res);

        this.getOrders();

        this.toastr.success("Order Confirmed Successfully","Confirm Order");
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Failed To Confirm Order","Confirm Order");
      }
    });

  }

  getPaymentName(paymentWay:number):string{

    if(paymentWay === 1){
      return "Instalpay";
    }

    if(paymentWay === 2){
      return "Vodafone Cash";
    }

    return "";

  }

}