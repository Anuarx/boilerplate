import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
  
  @Injectable({
    providedIn: 'root',
  })
  export class JwtInterceptorService implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.tokenService.getToken();
      req = req.clone({
        setHeaders: {
          Authorization: '' + authToken,
        },
      });
      return next.handle(req);
    }
  }
  