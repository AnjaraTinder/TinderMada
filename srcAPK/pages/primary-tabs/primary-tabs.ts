import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ChatPage} from '../../pages/chat/chat';
import { ProfilPage } from '../../pages/profil/profil';
import { ConfigurationPage } from '../../pages/configuration/configuration';
/**
 * Generated class for the PrimaryTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-primary-tabs',
  templateUrl: 'primary-tabs.html'
})
export class PrimaryTabsPage {

  configurationRoot = ConfigurationPage
  profilRoot = ProfilPage
  chatRoot = ChatPage


  constructor(public navCtrl: NavController) {}

}
