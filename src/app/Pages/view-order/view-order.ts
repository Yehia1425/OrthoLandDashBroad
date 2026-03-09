import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IViewOrder } from '../../Shared/Interface/iview-order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-order',
  imports: [ReactiveFormsModule],
  templateUrl: './view-order.html',
  styleUrl: './view-order.css',
})
export class ViewOrder {
BaseUrl = "https://ourtholandadmin.runasp.net";

orders:WritableSignal<IViewOrder[]>=signal([]);

viewOrdersForm = new FormGroup({
  startFrom: new FormControl(''),
  notConfirmedOnly: new FormControl(false)
});

constructor(private http: HttpClient) {}

    private readonly ToastrService=inject(ToastrService);

getOrders(){

  const startFrom = this.viewOrdersForm.value.startFrom;
  const notConfirmedOnly = this.viewOrdersForm.value.notConfirmedOnly;

  this.http.get<IViewOrder[]>(`${this.BaseUrl}/ViewOrders?startFrom=${startFrom}&notConfirmedOnly=${notConfirmedOnly}`)
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.orders.set(res);
      this.ToastrService.success("View Orders","Orders Loaded Successfully");
    },
    error:(err)=>{
      console.log(err.error);
      this.ToastrService.error("View Orders","Failed To Load Orders");
    }
  });

}


confirmOrder(id:number){

  this.http.put(`${this.BaseUrl}/ConfirmOrder/${id}`, {})
  .subscribe({
    next:(res)=>{
      console.log("Order Confirmed",res);

      // إعادة تحميل الطلبات
      this.getOrders();

      this.ToastrService.success("Confirm Order","Order Confirmed Successfully");
    },
    error:(err)=>{
      console.log(err);
      this.ToastrService.error("Confirm Order","Failed To Confirm Order");
    }
  });

}


}
