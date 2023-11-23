import { Component, EventEmitter } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  showNotification: boolean = false;
  newMessage: EventEmitter<any> = new EventEmitter<any>();

  message: any = {};
  private webSocket: WebSocket;
  mc_port = `${environment.mc_port}`
  mc_baseUrl: string | undefined;


  constructor() {
    this.mc_baseUrl = `ws://localhost:${this.mc_port}/api/ws/notification`;
    this.webSocket = new WebSocket(this.mc_baseUrl);
    this.webSocket.onmessage = (event) => {
      this.message = JSON.parse(event.data);
      this.showNotification = true;
      this.newMessage.emit(this.message);
    };
  }

  hideNotification() {
    this.showNotification = false;
  }

}
