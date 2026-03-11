import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesServices } from '../../Core/services/CategoriesServices/categories-services';
import { ICategoriesCreate } from '../../Shared/Interface/icategories-create';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from '../../Core/services/AttachmentService/attachment-service';

@Component({
  selector: 'app-create-categories',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-categories.html',
  styleUrl: './create-categories.css',
})
export class CreateCategories {
private readonly categoriesServices=inject(CategoriesServices);
private readonly toastrService=inject(ToastrService);
private readonly attachmentService = inject(AttachmentService);



categoriesForm: FormGroup = new FormGroup({
  name: new FormControl(''),
  logoUrl: new FormControl(''),
  videoUrl: new FormControl('')
});

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

uploadImage(event: any): void {

  const file = event.target.files[0];

  if (!file) return;

  this.attachmentService.uploadImage(file).subscribe({

    next: (res) => {

      let path = res.url.replace(/\s+/g, '_');

      this.categoriesForm.get('logoUrl')?.setValue(path);

      this.toastrService.success("Image Uploaded");

    },

    error: (err) => {

      console.log(err);
      this.toastrService.error("Upload Failed");

    }

  });

}


uploadVideo(event: any): void {

  const file = event.target.files[0];

  if (!file) return;

  this.attachmentService.uploadVideo(file).subscribe({

    next: (res) => {

      let path = res.url.replace(/\s+/g, '_');

      this.categoriesForm.get('videoUrl')?.setValue(path);

      this.toastrService.success("Video Uploaded");

    },

    error: (err) => {

      console.log(err);
      this.toastrService.error("Upload Failed");

    }

  });

}




submitCategories():void{

const categorie:ICategoriesCreate = {
  name: this.categoriesForm.value.name,
  logoUrl: this.categoriesForm.value.logoUrl,
  videoUrl: this.categoriesForm.value.videoUrl
}

this.CreateCategorie(categorie)

}

}





