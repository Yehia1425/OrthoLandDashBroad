import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-delete-offer',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './delete-offer.html',
  styleUrl: './delete-offer.css',
})
export class DeleteOffer {

      private readonly ToastrService=inject(ToastrService);
BaseUrl = "http://ourtholandadmin.runasp.net";

deleteOfferForm = new FormGroup({
  id: new FormControl('')
});

constructor(private http: HttpClient) {}

deleteOffer() {

  const id = this.deleteOfferForm.value.id;

  this.http.delete(`${this.BaseUrl}/DeleteOffer/${id}`)
    .subscribe(res => {
      console.log("Offer Deleted", res);
             this.ToastrService.success("Delete Offer","Delete Offer Succefully")

    });

}
}
