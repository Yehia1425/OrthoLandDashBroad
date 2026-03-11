import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OfferServices } from '../../Core/services/OfferServices/offer-services';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOffer } from '../../Shared/Interface/ioffer';
import { ICategories } from '../../Shared/Interface/icategories';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-offer',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-offer.html',
  styleUrl: './create-offer.css',
})
export class CreateOffer implements OnInit {

  private readonly offerServices = inject(OfferServices);
  private readonly productService = inject(ProductServicesandCategories);
  private readonly toastr = inject(ToastrService);

  categories: WritableSignal<ICategories[]> = signal([]);
  products: WritableSignal<any[]> = signal([]);

  today: string = new Date().toISOString().split('T')[0];

  offerForm: FormGroup = new FormGroup({
    buyQuantity: new FormControl(''),
    getQuantity: new FormControl(''),
    startDate: new FormControl(this.today),
    durationDays: new FormControl(''),
    categoryId: new FormControl(''),
    productId: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.GetAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      }
    });
  }

  getProductsByCategory(id: number): void {
    this.productService.GetGetProductsByCategoryId(id).subscribe({
      next: (res) => {
        this.products.set(res);
      }
    });
  }

  CreateOffer(offer: IOffer): void {

    this.offerServices.CreateOffer(offer).subscribe({

      next: () => {
        this.toastr.success("Create Offer Successfully");
      },

      error: () => {
        this.toastr.error("Create Offer Failed");
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