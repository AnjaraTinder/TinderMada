import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AlertController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../../config/firebase.config';
import { Camera, CameraOptions, EncodingType } from '@ionic-native/camera';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

    name : string = "";
    lastName : string = "";
    email : string = "";
    gender : string = "";
    date : string = "";
    pwd : string = "";
    pwdConfirm : string = "";
    imageUrl : string = "";
    user : User;
    image;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public userService: UserService,
              public loadingCtrl: LoadingController,
              private camera: Camera) {
      initializeApp(FIREBASE_CONFIG);
  }

  checkInscription(){
    if(this.name.length == 0 || this.lastName.length == 0 || this.email.length == 0 || this.gender.length == 0 || this.date.length == 0 || this.pwd.length == 0 || this.pwdConfirm.length == 0){
        console.log("vide")
        this.showAlert("plusieurs champs sont vide")
    }
    else if(this.pwd != this.pwdConfirm){
        this.showAlert("verifier votre mot de passe!")
    }
    else{
       this.inscription();
    }
  }

  showAlert(message : string) {
    let alert = this.alertCtrl.create({
      title: 'erreur',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  doLoading(content: string){
    let loading = this.loadingCtrl.create({
      content: content,
      duration: 5000
    });

    return loading;
  }

  inscription() : void{
    let load = this.doLoading("loading");
    load.present()
    this.userService.inscription(this.name, this.email, this.gender, this.date, this.pwd, this.imageUrl, this.lastName).then(response =>{
      if(response == "500"){
        load.dismiss()
        this.showAlert("l'adresse mail existe déjas")
      }else{
        this.user = response
        load.dismiss();
        this.pushHome();
      }
    })
  }

  async takePhoto(){
    try{
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY   
      }
    const result = await this.camera.getPicture(options);
    const image = `data:image/jpeg;base64,${result}`;
    this.image = image
    const pictures = storage().ref('pictures/'+this.name);
      pictures.putString(this.image, 'data_url')
      pictures.getDownloadURL().then(reponse =>{
      this.imageUrl = reponse
    })
  }
  catch(e){
      console.error(e);
  }
  }

  async getImageGallery(){
    try{
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        //mediaType: this.camera.MediaType.PICTURE
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY   
      }
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.image = image
      const pictures = storage().ref('pictures/'+this.name);
        pictures.putString(this.image, 'data_url')
        pictures.getDownloadURL().then(reponse =>{
        this.imageUrl = reponse
      })
  }
  catch(e){
      console.error(e);
  }
}


  pushHome(){
    this.navCtrl.setRoot(HomePage);
  }

}