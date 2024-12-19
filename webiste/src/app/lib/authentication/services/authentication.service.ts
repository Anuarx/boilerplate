import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #authenticated: WritableSignal<boolean> = signal<boolean>(false);

  set authenticated(value: boolean) {
    this.#authenticated.set(value);
  }

  get authenticated(): boolean {
    return this.#authenticated();
  }
}
