import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) {
    return this.httpClient.post(this.baseUrl + "/auth/register", user);
  }
}
