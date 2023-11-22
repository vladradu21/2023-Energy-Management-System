import { Component, EventEmitter } from '@angular/core';

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

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8082/api/ws/notification');
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
