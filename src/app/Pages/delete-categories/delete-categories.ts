import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { ICategories } from '../../Shared/Interface/icategories';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delete-categories',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './delete-categories.html',
  styleUrl: './delete-categories.css',
})
export class DeleteCategories implements OnInit {

constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

private readonly toastr = inject(ToastrService);
private readonly categoriesService = inject(ProductServicesandCategories);

BaseUrl = "https://ourtholandadmin.runasp.net";
AttachmentUrl = "https://ourtholand.runasp.net/api/Attachment";

categories: ICategories[] = [];

deleteCategoryForm = new FormGroup({
  id: new FormControl<number | null>(null)
});

ngOnInit(){
  this.getCategories();
}

getCategories(){

this.categoriesService.GetAllCategories().subscribe({

next:(res)=>{
this.categories = res;
this.cd.detectChanges();
},

error:(err)=>{
console.log(err);
}

})

}

getFileName(path:string){
return path.split('/').pop() ?? '';
}

deleteCategory(){

const id = this.deleteCategoryForm.value.id;

if(!id){
  this.toastr.error("Please Select Category");
  return;
}

const category = this.categories.find(c => c.id === id);

if(!category){
  this.toastr.error("Category Not Found");
  return;
}

// Delete Image
if(category.logoUrl){

const imageName = this.getFileName(category.logoUrl);

this.http.delete(`${this.AttachmentUrl}/delete-image/${imageName}`)
.subscribe({

next: ()=>{
console.log("Image Deleted:", imageName);
this.toastr.success("Image Deleted");
},

error: ()=>{
console.log("Image Not Found:", imageName);
this.toastr.warning("Image Not Found");
}

});

}

// Delete Video
if(category.videoUrl){

const videoName = this.getFileName(category.videoUrl);

this.http.delete(`${this.AttachmentUrl}/delete-video/${videoName}`)
.subscribe({

next: ()=>{
console.log("Video Deleted:", videoName);
this.toastr.success("Video Deleted");
},

error: ()=>{
console.log("Video Not Found:", videoName);
this.toastr.warning("Video Not Found");
}

});

}

// Delete Category
this.http.delete(`${this.BaseUrl}/DeleteCategory/${id}`)
.subscribe({

next: () => {

console.log("Category Deleted:", id);

this.toastr.success("Category Deleted Successfully");

// حذف الكاتيجوري من القائمة
this.categories = this.categories.filter(c => c.id !== id);

// reset form
this.deleteCategoryForm.reset();

// تحديث البيانات
this.getCategories();

},

error: (err) => {

console.error(err);

this.toastr.error("Delete Categories Failed");

}

});

}

}