import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../model/LoginData';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  um_port = `${environment.um_port}`
  baseUrl: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `http://localhost:${this.um_port}/api`;
  }

  loginUser(loginData: LoginData) {
    return this.httpClient.post(this.baseUrl + "/auth/login", loginData);
  }
}
