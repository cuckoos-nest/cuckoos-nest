import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'users-page'
})
@Component({
  selector: 'users-page',
  templateUrl: 'users.html',
})
export class UsersPage {
  @Input() title: string;

  @Input() users: Observable<UserModel[]> | UserModel[];

  private isLoaded: Boolean;

  get isAsync(): Boolean {
    return this.users instanceof Observable;
  }

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
    this.users = this.navParams.get('users');
    this.title = this.navParams.get('title');
  }
  
  ionViewDidLoad(): void {
    if (this.isAsync) {
      (<Observable<UserModel[]>>this.users).subscribe(() => this.isLoaded = true);
    }
    else {
      this.isLoaded = true;
    }
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }

}
