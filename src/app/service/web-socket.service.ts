import { Injectable } from '@angular/core';
import {ChatMessageDTO} from "../model/ChatMessageDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  chatroom_port = `${environment.cr_port}`
  webSocket: WebSocket;
  chatMessages: ChatMessageDTO[] = [];

  constructor() {
    const websocketChatUrl = `ws://localhost:${this.chatroom_port}/api/chat`;
    this.webSocket = new WebSocket(websocketChatUrl);
  }

  public openWebSocket() {
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
