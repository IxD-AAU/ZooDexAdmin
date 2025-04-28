import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsernameGetterService {
  public username: string = '';

  constructor(private http: HttpClient) {}

  setUsername(username: string) {
    this.username = username;
  }
  getUsername() {
    return this.username;
  }
}
