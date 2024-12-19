import { Injectable } from '@angular/core';
import { StorageService } from '../../storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private storageService: StorageService<string>
  ) { }

  saveToken(token: string): void {
    this.storageService.setItem('token', token)
  }

  getToken(): string {
    return this.storageService.getItem('token')
  }

  removeToken(): void {
    this.storageService.removeItem('token')
  }
}
