import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LikeProfil } from '../../models/likeprofil.model';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
      like: {
          backgroundColor: '#28e93b'
      },
      dislike: {
          backgroundColor: '#e92828'
      }
  };


  sizeCard : any = 0;
  user: User = new User();
  userSwipe: User = new User();
  allUser: User[] = new Array();
  id : string = "";
  idtemp = 0;
  userTemp: User = new User()

  likeEvent = new EventEmitter()
  destroyEvent = new EventEmitter()

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserService,
              private sanitizer: DomSanitizer,
              private useService: UserService,
              private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('id').then(data=>{
      this.id = data.id
      this.getAll()
      this.userService.findById(this.id).then(reponse =>{
        this.user = reponse
      })
    })

    /*this.userService.findById(this.id).then(reponse =>{
      this.user = reponse
    })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  getAll(){
    this.userService.findAll(this.id).then(data =>{
      this.allUser = data
    }).then(repoonse=>{
      this.userTemp = this.allUser[0]
      this.sizeCard = this.allUser.length
      for (let i = 0; i < this.allUser.length; i++) {
        this.attendants.push({
          user: this.allUser[i],
          id: i + 1,
          likeEvent: new EventEmitter(),
          destroyEvent: new EventEmitter(),
          asBg: this.sanitizer.bypassSecurityTrustStyle('url('+this.allUser[i].imageUrl+')')
        });
      }
      
    })
        
    this.ready = true;
  }

  setIdTemp(id): void{
    this.idtemp = id + 1;
  }
  
  onCardInteract(event, user: User, attendant) {
    if(event.like == true){
      this.sizeCard = this.sizeCard - 1
      console.log("like");
      console.log(user.name)
      if(this.sizeCard > 0){
        console.log(attendant.id)
        this.userTemp = this.allUser[attendant.id]
      }
      this.likeUser(user);
    }
    else{
      this.sizeCard = this.sizeCard - 1
      if(this.sizeCard > 0){
        console.log(attendant.id)
        this.userTemp = this.allUser[attendant.id]
      }
      console.log("dislike")
      console.log(user.name)
    }
  }

  likeUser(userLiked : User){
    let user : User = new User();
    user.id = this.id;
    if( this.user.listLike === null){
        this.user.listLike = new Array<User>();
    
    }
    this.user.listLike.push(userLiked);
    let likeRequest : LikeProfil = new LikeProfil();
    likeRequest.userLiked = userLiked.id;
    likeRequest.userLiker = user.id;
    this.userService.insertUserLike(likeRequest)
    .subscribe((data) =>{
    });
  }

  getInfo(){
    console.log(this.userTemp)
  }

}
