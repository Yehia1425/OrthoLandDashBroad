import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './Core/interceptors/loadinginterceptor/loadinginterceptor-interceptor';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";





export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([loadingInterceptor])),
    provideAnimations(),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule),

    

  ]
};
