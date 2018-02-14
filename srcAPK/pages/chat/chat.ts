import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatDetailsPage } from '../chatdetails/chatDetails';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  id : string = "";
  user: User = new User();
  userLike: User[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UserService,private nativeStorage: NativeStorage) {
   //this.getLike()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.getLike()
  }

  getLike(){
    this.nativeStorage.getItem('id').then(reponse=>{
      this.id = reponse.id;
      this.userService.findById(this.id).then(reponse =>{
        this.user = reponse
        this.userLike = this.user.listLike
      })
    });
    
  }


  chat(idRecpt){
    this.navCtrl.push(ChatDetailsPage,{
      id: idRecpt
    });
  }

}
