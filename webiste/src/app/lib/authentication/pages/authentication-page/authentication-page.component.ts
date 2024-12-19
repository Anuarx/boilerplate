import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../../../ui';
import { LoginFormContainerComponent } from '../../components/login-form-container/login-form-container.component';

@Component({
  selector: 'app-authentication-page',
  imports: [MatCardModule, CommonModule, ButtonComponent, LoginFormContainerComponent],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.scss'
})
export class AuthenticationPageComponent {

}
