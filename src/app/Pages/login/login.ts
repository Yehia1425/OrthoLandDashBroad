import { AuthServices } from './../../Core/services/AuthServices/auth-services';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthServices);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loginForm = new FormGroup({
    userName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

login() {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.toastr.warning('Please fill all fields', 'Validation');
    return;
  }

  const userName = this.loginForm.controls.userName.value!;
  const password = this.loginForm.controls.password.value!;

  this.authService.login(userName, password).subscribe({

    next: (res) => {

      if (res === true) {

        localStorage.setItem("logged", "true");

        this.toastr.success('Login Successfully', 'Success');

        console.log("Login Success");

        this.router.navigate(['/home']);

      } else {

        this.toastr.error('UserName or Password incorrect', 'Login Failed');

        console.log("Login Failed");

      }

    },

    error: (err) => {

      this.toastr.error('Server Error', 'Error');

      console.log(err);

    }

  });

}

}