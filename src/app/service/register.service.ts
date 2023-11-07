import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  um_port = `${environment.um_port}`
  baseUrl: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `http://localhost:${this.um_port}/api`;
  }

  registerUser(user: User) {
    return this.httpClient.post(this.baseUrl + "/auth/register", user);
  }
}
