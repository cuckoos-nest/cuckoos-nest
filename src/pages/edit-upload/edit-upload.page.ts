import { UploadModel } from './../../models/upload.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UploadService } from '../../services/upload.service';

/**
 * Generated class for the EditUpload page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'edit-upload-page'
})
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
