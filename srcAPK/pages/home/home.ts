import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { PrimaryTabsPage } from '../../pages/primary-tabs/primary-tabs';
import { LoginPage } from '../../pages/login/login';
import { InscriptionPage } from '../inscription/inscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  splash = true;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 6000);
  }

  login(){
    this.navCtrl.push(LoginPage)
  }

  goProfil(){
    this.navCtrl.push(LoginPage);
  }

  goInscription(){
    this.navCtrl.push(InscriptionPage)
  }

}
