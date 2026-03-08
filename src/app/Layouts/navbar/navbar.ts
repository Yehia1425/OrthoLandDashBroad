import { Component } from '@angular/core';
import { Home } from "../../Pages/home/home";
import { Product } from "../../Pages/product/product";
import { UpdateProduct } from "../../Pages/update-product/update-product";
import { Deleteproduct } from "../../Pages/deleteproduct/deleteproduct";
import { CreateCategories } from "../../Pages/create-categories/create-categories";
import { UpdateCategories } from "../../Pages/update-categories/update-categories";
import { DeleteCategories } from '../../Pages/delete-categories/delete-categories';
import { CreateOffer } from '../../Pages/create-offer/create-offer';
import { UpdateOffer } from '../../Pages/update-offer/update-offer';
import { DeleteOffer } from '../../Pages/delete-offer/delete-offer';
import { ViewOrder } from '../../Pages/view-order/view-order';
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [UpdateOffer, DeleteOffer, ViewOrder, RouterLink, RouterOutlet,NgxSpinnerComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
