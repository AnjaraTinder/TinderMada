import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrimaryTabsPage } from '../pages/primary-tabs/primary-tabs';
import { ChatPage} from '../pages/chat/chat';
import { ProfilPage } from '../pages/profil/profil';
import { LoginPage } from '../pages/login/login';
import { ConfigurationPage } from '../pages/configuration/configuration';

import { HttpModule } from '@angular/http';
import { UserService } from '../services/user.service';
import { ChatDetailsPage } from '../pages/chatdetails/chatDetails';
import { EmojiProvider } from '../emoji/emoji';
import { EmojiPickerComponent } from '../components/emoji-picker/emoji-picker';
import { ChatService } from '../services/chat.service';

import { SwipeCardsModule } from 'ng2-swipe-cards';
import { CardPage } from '../pages/card/card';
import { InscriptionPage } from '../pages/inscription/inscription';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePage } from '../pages/image/image';
import { NativeStorage } from '@ionic-native/native-storage';
import { MessageService } from '../services/message.service';
import { ReglagePage } from '../pages/reglage/reglage';
import { ReglageService } from '../services/reglage.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrimaryTabsPage,
    ChatPage,
    ProfilPage,
    ConfigurationPage,
    LoginPage,
    ChatDetailsPage,
    EmojiPickerComponent,
    CardPage,
    InscriptionPage,
    ImagePage,
    ReglagePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    SwipeCardsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrimaryTabsPage,
    ChatPage,
    ProfilPage,
    ConfigurationPage,
    LoginPage,
    EmojiPickerComponent,
    ChatDetailsPage,
    CardPage,
    InscriptionPage,
    ImagePage,
    ReglagePage    
  ],
  providers: [
    StatusBar,
    UserService,
    MessageService,
    ReglageService,
    SplashScreen,
    EmojiProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
