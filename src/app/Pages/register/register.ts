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
  },

  error: (err) => {
    console.log(err);
  }

});

}

}
