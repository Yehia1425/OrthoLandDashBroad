import { Component, inject } from '@angular/core';
import { OfferServices } from '../../Core/services/OfferServices/offer-services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOffer } from '../../Shared/Interface/ioffer';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-offer',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-offer.html',
  styleUrl: './create-offer.css',
})
export class CreateOffer {

  private readonly offerServices = inject(OfferServices);
  private readonly ToastrService = inject(ToastrService);

  today: string = new Date().toISOString().split('T')[0];

  offerForm: FormGroup = new FormGroup({
    buyQuantity: new FormControl(''),
    getQuantity: new FormControl(''),
    startDate: new FormControl(this.today), // تاريخ اليوم تلقائي
    durationDays: new FormControl(''),
    productId: new FormControl('')
  });

  CreateOffer(offer: IOffer): void {

    this.offerServices.CreateOffer(offer).subscribe({

      next: (response) => {
        console.log(response);
        this.ToastrService.success("Create Offer", "Create Offer Successfully");
      },

      error: (error) => {
        console.log(error.error);
        this.ToastrService.error("Fail Create Offer", "Create Offer Fail");
      }

    });

  }

  submitOffer(): void {

    const offer: IOffer = {
      buyQuantity: Number(this.offerForm.value.buyQuantity),
      getQuantity: Number(this.offerForm.value.getQuantity),
      startDate: this.offerForm.value.startDate,
      durationDays: Number(this.offerForm.value.durationDays),
      productId: Number(this.offerForm.value.productId)
    };

    this.CreateOffer(offer);

  }

}