import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { PrimaryTabsPage } from '../primary-tabs/primary-tabs';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  sizeCard : any = 0;
  user : User = new User();
  email: string = "";
  mdp: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public userservice: UserService,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'erreur',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  checkLogin(){
    this.userservice.verifLogin(this.email, this.mdp).then(user=>{
      this.user = user
      if(user != null){
        this.setLoginStorage(this.user.id)
        this.pushProfil();
      }
      else{
        this.showAlert("verifier votre login")
      }
    })
  }

  pushProfil(){
    this.navCtrl.setRoot(PrimaryTabsPage);
  }

  setLoginStorage(idUser: string): void{
    this.nativeStorage.setItem('id',{id : idUser})
  }

}