import { UploadService } from './../../services/upload.service';
import { AuthService } from './../../services/auth.service';
import { UploadModel } from './../../models/upload.model';
import { UserModel } from './../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';


@IonicPage()
@Component({
  selector: 'wall-page',
  templateUrl: 'wall.html',
})
export class WallPage {
  private currentWall: UploadModel[];
  private currentUser: UserModel;
  private loadCount = 0;
  private isLoaded: Boolean;
  private isInfinityLoading: Boolean;

  constructor(private loadingCtrl: LoadingController, private uploadService: UploadService,
              private authService: AuthService, private push: Push) {
  }

  ionViewDidLoad(): void {
    this.loadCount = 2;
    this.currentUser = this.authService.currentUser;
    this.loadItems().then(() => this.isLoaded = true);

    //  this.push.register().then((t: PushToken) => {
    //           return this.push.saveToken(t);}).then((t: PushToken) => {
    //             console.log('Token saved:', t.token);
    //           });

    //           this.push.rx.notification()
    //     .subscribe((msg) => {   
    //       alert(msg.title + ': ' + msg.text);
    //     });
  }

  private loadItems(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.uploadService.getWallOnce(this.loadCount).subscribe(x => {
          this.currentWall = x;
          this.isInfinityLoading = false;
          resolve();
        });
    });
  }

  private doInfinite(infiniteScroll: any) {
    if (!this.isInfinityLoading) {
      this.isInfinityLoading = true;
      console.log("doing infinity");
      this.loadCount += 2;

      this.loadItems().then(() => {
          infiniteScroll.complete();
          console.log("finished infinity");
      });
    }
  }

  private doRefresh(refresher) {
    console.log('doing refresh', refresher);

    this.loadItems().then(() => {
      console.log('finished refresh');
      refresher.complete();
    });
  }

  private trackWallItem(index: number, wallItem: UploadModel) {
    if (wallItem == null)
      return null;
      
    return wallItem.$key; 
  }
}