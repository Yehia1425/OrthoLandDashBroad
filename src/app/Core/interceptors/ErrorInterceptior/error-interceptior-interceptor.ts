import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const toastr = inject(ToastrService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      let message = "Server Error";

      if (error?.error?.message) {
        message = error.error.message;
      } 
      else if (error?.message) {
        message = error.message;
      }

      if (typeof window !== 'undefined') {
        toastr.error(message);
      }

      return throwError(() => error);

    })

  );

};