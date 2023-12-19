import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../service/web-socket.service";
import {ChatMessageDTO} from "../../model/ChatMessageDTO";

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit, OnDestroy {

  username = localStorage.getItem('username') || '';
  constructor(public webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm){
    const chatMessageDTO = new ChatMessageDTO(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDTO);
    sendForm.controls['message'].reset();
  }
}
