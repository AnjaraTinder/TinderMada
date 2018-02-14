import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ReglagePage } from '../reglage/reglage';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  user: User = new User();
  id : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, private nativeStorage: NativeStorage) {
    
    this.nativeStorage.getItem('id').then(data=>{
      this.id = data.id
      
      this.userService.findById(this.id).then(reponse =>{
        this.user = reponse
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  reglage(){
    this.navCtrl.push(ReglagePage);
  }

}
