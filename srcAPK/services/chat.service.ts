import { Injectable } from "@angular/core";

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


@Injectable()
export class ChatService{

    private serverUrl = 'https://intense-everglades-99626.herokuapp.com/socket'
    private stompClient;

    constructor() { }

    initializeWebSocketConnection(){
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
          that.stompClient.subscribe("/chat", (message) => {
            if(message.body) {
              return message.body;
            }
          });
        });
    }

    sendMessage(message : string){
        this.stompClient.send("/app/send/message" , {}, message);
    }

}