import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-update-offer',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-offer.html',
  styleUrl: './update-offer.css',
})
export class UpdateOffer {

      private readonly ToastrService=inject(ToastrService);
BaseUrl = "http://ourtholandadmin.runasp.net";

updateOfferForm = new FormGroup({
  id: new FormControl(''),
  durationDays: new FormControl('')
});

constructor(private http: HttpClient) {}

updateOffer() {

  const id = this.updateOfferForm.value.id;

  const body = {
    durationDays: this.updateOfferForm.value.durationDays
  };

  this.http.put(`${this.BaseUrl}/UpdateOffer/${id}`, body)
    .subscribe(res => {
      console.log("Offer Updated", res);
      this.ToastrService.success("Update Offer","Update Offer Succefully")

    });

}
}
