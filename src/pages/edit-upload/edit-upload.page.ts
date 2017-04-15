import { UploadModel } from './../../models/upload.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UploadService } from '../../services/upload.service';

@IonicPage()
@Component({
  selector: 'edit-upload-page',
  templateUrl: 'edit-upload.html',
})
export class EditUploadPage {
  private upload: UploadModel;
  private photoX: number;
  private photoY: number;

  constructor(private navController: NavController, private uploadService: UploadService,
              private navParams: NavParams, private alertCtrl: AlertController) {
    this.upload = navParams.get('upload');
  }

  private share() {
    if (!this.upload.description) {
      let alert = this.alertCtrl.create({
        title: 'Description missing',
        subTitle: 'Please write a description',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.uploadService.create(this.upload);
    this.navController.popToRoot();
  }

}
