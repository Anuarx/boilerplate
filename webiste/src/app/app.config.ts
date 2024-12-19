import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, RouterModule, provideRouter, withPreloading } from '@angular/router';

import { BrowserModule, } from '@angular/platform-browser';
import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RootModule } from './lib/shared/root/root.module';
import { DialogService } from './lib/ui';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    DialogService,
    importProvidersFrom(
      BrowserModule,
      RootModule,
      RouterModule,
      BrowserAnimationsModule,
      HttpClientModule,
    ),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
};
