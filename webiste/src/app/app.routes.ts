import { Routes } from '@angular/router';
import { AuthenticationPageComponent } from './lib/authentication/pages/authentication-page/authentication-page.component';
import { CultivaresViewPageComponent } from './lib/backoffice/cultivares/pages/cultivares-view-page/cultivares-view-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cultivares', 
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthenticationPageComponent, 
  },
  {
    path: 'cultivares',
    component: CultivaresViewPageComponent, 
  },
  {
    path: '**',
    redirectTo: 'cultivares', 
  },
];
