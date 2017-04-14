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
        if (this._auth.authenticated) {
          this.rootPage = 'MainMenuPage';
        }
        else {
          alert("Login failed. Reload to try again. (Temp message)");
        }
      });
  }
}

