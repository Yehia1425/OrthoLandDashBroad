import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-delete-categories',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './delete-categories.html',
  styleUrl: './delete-categories.css',
})
export class DeleteCategories {
constructor(private http: HttpClient) {}

    private readonly ToastrService=inject(ToastrService);


BaseUrl = "https://ourtholandadmin.runasp.net";

deleteCategoryForm = new FormGroup({
  id: new FormControl('')
});
deleteCategory(){

  const id = this.deleteCategoryForm.value.id;

  this.http.delete(`${this.BaseUrl}/DeleteCategory/${id}`)
  .subscribe({
    next: (res) => {
      console.log("Category Deleted", res);
      this.ToastrService.success("Delete Categories", "Delete Categories Successfully");
    },
    error: (err) => {
      console.error("Delete Failed", err);
      this.ToastrService.error("Delete Categories", "Delete Categories Failed");
    }
  });

}

}

