import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from '../model/Device';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  dm_port = `${environment.dm_port}`
  dm_baseUrl: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.dm_baseUrl = `http://localhost:${this.dm_port}/api/devices`
  }

  getAll() {
    let username = localStorage.getItem("username")
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.get<Device[]>(this.dm_baseUrl + "/all/" + username, { headers: header});
  }

  getByName(deviceName: string) {
    let username = localStorage.getItem("username")
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.get<Device>(this.dm_baseUrl + "/get/" + deviceName + "/" + username, { headers: header});
  }

  update(device: Device) {
    let username = localStorage.getItem("username")
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.put<Device>(this.dm_baseUrl + "/update/" + username, device, { headers: header});
  }

  delete(deviceName: string) {
    let username = localStorage.getItem("username")
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.delete<Device>(this.dm_baseUrl + "/delete/" + deviceName + "/" + username, { headers: header});
  }

  create(device: Device) {
    let username = localStorage.getItem("username")
    let auth_token = localStorage.getItem("tokenLogin") || "";
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token.replace(/"/g, '')}`)
    return this.httpClient.post<Device>(this.dm_baseUrl + "/" + username, device, { headers: header});
  }
}
