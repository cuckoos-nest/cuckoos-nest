import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from 'ng2-translate';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage: Component = null;

  constructor(private platform: Platform, private _auth: AuthService,
              private translate: TranslateService) {

    translate.setDefaultLang('en');
    translate.use('en');

    platform.ready().then(() => {
  
    });
  }

  ngOnInit() {
    this._auth.signInWithFacebook()
      .subscribe(() => {
        console.log('fuck', this._auth.currentUser);
        if (this._auth.authenticated) {
          this.rootPage = 'MainMenuPage';
        }
        else {
          alert("Login failed. Reload to try again. (Temp message)");
        }
      });

      // this.push.register().then((t: PushToken) => {
      //         return this.push.saveToken(t);}).then((t: PushToken) => {
      //           console.log('Token saved:', t.token);
      //         });

      //         this.push.rx.notification()
      //   .subscribe((msg) => {
      //     alert(msg.title + ': ' + msg.text);
      //   });
  }
}

