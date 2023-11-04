import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  um_baseUrl: string = 'http://localhost:8080/api/users';
  dm_baseUrl: string = 'http://localhost:8081/api/users';
  um_admin_baseUrl: string = 'http://localhost:8080/api/admin';

  constructor(private httpClient: HttpClient) { }

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
