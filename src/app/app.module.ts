import { WallItemComponent } from './../components/wall-item/wall-item.component';
import { GalleryComponent } from './../components/gallery/gallery.component';
import { Facebook } from '@ionic-native/facebook';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from "angularfire2";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { Camera } from '@ionic-native/camera';
import { ServicesModule } from '../services/services.module'; 

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fcb642d2'
  },
  'push': {
    'sender_id': '374424090153',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    ServicesModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook,
    Camera,
  ]
})
export class AppModule { }
