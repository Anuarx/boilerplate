import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {
  constructor() { }

  // Set a value in local storage
  setItem(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  getItem(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key) as string) as T;
    } catch {
      return null as T;
    }
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
