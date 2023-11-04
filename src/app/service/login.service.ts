import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../model/LoginData';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  loginUser(loginData: LoginData) {
    return this.httpClient.post(this.baseUrl + "/auth/login", loginData);
  }
}
