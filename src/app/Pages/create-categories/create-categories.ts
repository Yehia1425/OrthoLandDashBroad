import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesServices } from '../../Core/services/CategoriesServices/categories-services';
import { ICategoriesCreate } from '../../Shared/Interface/icategories-create';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-categories',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-categories.html',
  styleUrl: './create-categories.css',
})
export class CreateCategories {
private readonly categoriesServices=inject(CategoriesServices);
private readonly toastrService=inject(ToastrService);



categoriesForm:FormGroup = new FormGroup({
  name:new FormControl(''),
  logoUrl:new FormControl(''),

})

CreateCategorie(categories:ICategoriesCreate):void{
    this.categoriesServices.CreateCategories(categories).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastrService.success("Create Categories","Create Categories Succefully")

      },
      error:(error)=>{
        console.log(error);
         this.toastrService.error("Fail Categories","Fail Categories Succefully")
      }
    })

}



  submitCategories():void{

const categorie:ICategoriesCreate = {
  name:this.categoriesForm.value.name,
  logoUrl:this.categoriesForm.value.logoUrl
}

this.CreateCategorie(categorie)

}


}





