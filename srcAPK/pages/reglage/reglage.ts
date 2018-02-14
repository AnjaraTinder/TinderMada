import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { ReglageService } from '../../services/reglage.service';

/**
 * Generated class for the ReglagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reglage',
  templateUrl: 'reglage.html',
})
export class ReglagePage {

  structure: any = { lower: 18, upper: 20 };
  distance: number = 0
  homme: boolean = false;
  femme: boolean = false;

  id : string = ""
  user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private useService: UserService, 
              private nativeStorage: NativeStorage,
              private reglageService: ReglageService) {
    this.nativeStorage.getItem('id').then(data=>{
      this.id = data.id
      this.getConfig()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReglagePage');
  }

  save(){
    console.log(this.homme);
    console.log(this.femme);
    console.log(this.distance);
    console.log(this.structure.lower)
    console.log(this.structure.upper)
  }

  disconnect(){
    this.navCtrl.setRoot(HomePage)
  }

  getConfig(){
    this.useService.findById(this.id).then(reponse =>{
      this.user = reponse
      this.structure.lower = this.user.configuration.ageMin
      this.structure.upper = this.user.configuration.ageMax
      this.homme = this.user.configuration.homme
      this.femme = this.user.configuration.femme
      this.distance = this.user.configuration.distance
    })
  }

  updateConfig(){
    this.reglageService.update(this.user.id, this.homme, this.femme, this.structure.lower, this.structure.upper, this.distance.toString())
    .then(reponse=>{
      this.getConfig();
    });
  }

}
