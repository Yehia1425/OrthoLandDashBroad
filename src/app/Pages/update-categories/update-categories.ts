import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-update-categories',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-categories.html',
  styleUrl: './update-categories.css',
})
export class UpdateCategories {
    private readonly ToastrService=inject(ToastrService);

BaseUrl = "http://ourtholandadmin.runasp.net";

updateCategoryForm = new FormGroup({
  id: new FormControl(''),
  name: new FormControl('')
});

constructor(private http: HttpClient) {}

updateCategory() {

  const id = this.updateCategoryForm.value.id;

  const body = {
    name: this.updateCategoryForm.value.name
  };

  this.http.put(`${this.BaseUrl}/UpdateCategory/${id}`, body)
    .subscribe({
      next: (res) => {
        console.log("Category Updated", res);
        this.ToastrService.success("Update Categories", "Update Categories Successfully");
      },
      error: (err) => {
        console.error("Update Failed", err);
        this.ToastrService.error("Update Categories", "Update Categories Failed");
      }
    });

}
}
