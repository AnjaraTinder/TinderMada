import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, Content, TextInput } from 'ionic-angular';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { MessageModel } from '../../models/message.model';
import { User } from '../../models/user.model';
import { MessageService } from '../../services/message.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'page-chatDetails',
  templateUrl: 'chatDetails.html',
})
export class ChatDetailsPage {
  
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  recepteur : string = "";
  sender : string = "";
  user1 : User;
  user2 : User;
  texte : string;
  message : MessageModel;
  listMessage : MessageModel[] = new Array();
  //listMessage: string[] = new Array();
  showEmojiPicker = false;
  private serverUrl = 'https://intense-everglades-99626.herokuapp.com/socket'
  private stompClient;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public messageService: MessageService,  
              private nativeStorage: NativeStorage,
              public userService: UserService) {
    this.recepteur = this.navParams.get('id')
    this.nativeStorage.getItem('id').then(data=>{
        this.userService.findById(data.id).then(reponse=>{
        this.user1 = reponse
        })
        this.sender = data.id;
        this.teste()
    })
    //this.initializeWebSocketConnection();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
        this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat/"+that.sender, (message) => {
        if(message.body) {
          that.updateMessages(JSON.parse(message.body) as MessageModel);
          console.log(that.listMessage)
        }
      });
    });
  }

  sendMessage(){
    this.stompClient.send("/app/send/message" , {}, '{"receiver":"'+this.recepteur+'", "sender":"'+this.sender+'", "message":"'+this.texte+'"}');
    let messageTemp: MessageModel = new MessageModel()
    messageTemp.message = this.texte
    let receptTemp : User = new User()
    receptTemp.id = this.recepteur
    let sendTemp : User = new User()
    sendTemp = this.user1
    messageTemp.expediteur = sendTemp
    messageTemp.recepteur = receptTemp
    this.listMessage.push(messageTemp)
    this.scrollToBottom();
    this.texte = ""
  }

  updateMessages(message : MessageModel) : void{
    this.listMessage.push(message);
    this.scrollToBottom();
  }

  teste(){
    this.initializeWebSocketConnection()
    this.messageService.getAll(this.recepteur+this.sender, this.sender+this.recepteur)
    .then(
      reponse => {
        this.listMessage = reponse 
      console.log(this.listMessage)
      this.scrollToBottom();
    }
    )
  }

}