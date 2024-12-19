import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  onLogout(): void {
    this.logout()
  }

  private logout(): void {
    this.tokenService.removeToken();
    this.authenticationService.authenticated = false
    this.router.navigate(['/authentication/login'])
  }
}
