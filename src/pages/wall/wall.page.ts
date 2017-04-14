import { UploadService } from './../../services/upload.service';
import { AuthService } from './../../services/auth.service';
import { UploadModel } from './../../models/upload.model';
import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage({
  name: 'wall-page'
})
@Component({
  selector: 'wall-page',
  templateUrl: 'wall.html',
})
export class WallPage {
  private currentWall: Observable<UploadModel[]>;
  private olderPosts: UploadModel[] = [];
  private currentUser: UserModel;
  private loadCount = 0;
  private isLoaded: Boolean;

  constructor(private loadingCtrl: LoadingController, private uploadService: UploadService,
              private authService: AuthService) {
    this.currentWall = this.uploadService.getWall();
    this.loadCount = 5;
    this.currentUser = this.authService.currentUser;
  }

  ionViewDidLoad(): void {
    this.currentWall.subscribe(() => this.isLoaded = true);
  }

  private doInfinite(infiniteScroll: any) {
  }

}
