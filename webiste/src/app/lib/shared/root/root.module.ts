import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationPageComponent } from '../../authentication/pages/authentication-page/authentication-page.component';

const routes: Route[] = [
   {
     path: 'login',
     component: AuthenticationPageComponent,
   }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RootModule { }
