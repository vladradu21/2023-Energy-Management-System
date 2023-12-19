import { Injectable } from '@angular/core';
import {ChatMessageDTO} from "../model/ChatMessageDTO";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMessages: ChatMessageDTO[] = [];
  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8084/api/chat');
  }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8084/api/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event)
    }

    this.webSocket.onmessage = (event) => {
      const chatMessageDTO = JSON.parse(event.data)
      this.chatMessages.push(chatMessageDTO);
    };

    this.webSocket.onclose = (event) => {
      console.log("Closed: ", event)
    }
  }

  public sendMessage(chatMessageDTO: ChatMessageDTO) {
    this.webSocket.send(JSON.stringify(chatMessageDTO));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
