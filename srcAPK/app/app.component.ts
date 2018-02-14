import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';
import { ChatDetailsPage } from '../pages/chatdetails/chatDetails';
import { CardPage } from '../pages/card/card';
import { InscriptionPage } from '../pages/inscription/inscription';
import { ImagePage } from '../pages/image/image';
import { ReglagePage } from '../pages/reglage/reglage';

@Component({
  
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

