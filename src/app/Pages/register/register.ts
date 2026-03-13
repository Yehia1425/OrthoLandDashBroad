import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServices } from '../../Core/services/AuthServices/auth-services';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 
  
  private authService = inject(AuthServices);
  private router = inject(Router);
  private toaster = inject(ToastrService)

  loading: boolean = false;

  createAdminForm: FormGroup = new FormGroup({
    secretWord: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

createNewAdmin(): void {

console.log(this.createAdminForm.value);

this.authService.createAdmin(this.createAdminForm.value).subscribe({

  next: (res) => {
    console.log(res);
    this.toaster.success("Craete Admin Successfully","Craete Admin")
  },

  error: (err) => {
    console.log(err);
     this.toaster.error("Craete Admin Falied","Falied")
  }

});

}

}
