import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  um_port = `${environment.um_port}`
  dm_port = `${environment.dm_port}`
  um_baseUrl: string | undefined;
  dm_baseUrl: string | undefined;
  um_admin_baseUrl: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.um_baseUrl = `http://localhost:${this.um_port}/api/users`;
    this.dm_baseUrl = `http://localhost:${this.dm_port}/api/devices`;
    this.um_admin_baseUrl = `http://localhost:${this.um_port}/api/admin`;
  }

  getByUsername(username: string) {
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.get<User>(this.um_baseUrl + "/username/" + username, {headers: header});
  }

  getAll() {
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.get<User[]>(this.um_admin_baseUrl + "/all",{ headers: header});
  }

  update(user : User) {
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.put(this.um_admin_baseUrl + "/update", user,  { headers: header});
  }

  delete(username : string){
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.delete(this.um_admin_baseUrl + "/delete/" + username,  { headers: header});
  }

  addUserDeviceMicroservice(username : string) {
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.post(this.dm_baseUrl + "/" + username,  { headers: header});
  }

  removeUserDeviceMicroservice(username : string) {
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.delete(this.dm_baseUrl + "/delete/" + username,  { headers: header});
  }
}
