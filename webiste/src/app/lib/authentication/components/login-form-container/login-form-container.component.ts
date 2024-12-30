import { Component, effect } from '@angular/core';
import { LoginFormInput } from '../login-form/login-form.interface';
import { Router } from '@angular/router';
import { AlertService, ButtonComponent } from '../../../ui';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthenticationUsecaseService } from '../../infraestructure/application/use-case/authentication.usecase.service';
import { AuthenticationService, TokenService } from '../../services';

@Component({
  selector: 'app-login-form-container',
  imports: [LoginFormComponent, ButtonComponent],
  templateUrl: './login-form-container.component.html',
  styleUrl: './login-form-container.component.scss'
})
export class LoginFormContainerComponent {
  isLoading: boolean = false
  isFormValid: boolean = false

  form: LoginFormInput = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
     private authenticationUseCase: AuthenticationUsecaseService,
    private alertService: AlertService,
     private authenticationService: AuthenticationService,
     private tokenService: TokenService,
  ) { }

   authEffectResponse = effect(() => {
     this.isLoading = this.authenticationUseCase.loginState.state().isLoading

     if (this.authenticationUseCase.loginState.state().error) {
       this.alertService.error('Error al iniciar sesión')
     }

     if (Object.keys(this.authenticationUseCase.loginState.state().data).length > 0) {
       this.tokenService.saveToken(this.authenticationUseCase.loginState.state().data.token)
       this.authenticationService.authenticated = true

       this.router.navigate([''])
     }
   }, { allowSignalWrites: true })

  ngOnDestroy(): void {
     this.authenticationUseCase.loginState.reset()
  }

  onFormChange(event: LoginFormInput): void {
    this.form = event
  }

  onFormStatusChange(event: boolean): void {
    this.isFormValid = event
  }

  onLogin(): void {
    if (!this.isFormValid) {
      this.alertService.info('Ingrese los campos obligatorios')
      return
    }

    this.router.navigateByUrl('/cultivares');

     this.authenticationUseCase.loginState.dispatch(this.form)
  }
}
