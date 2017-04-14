import { UploadModel } from './../../models/upload.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'wall-item-page'
})
@Component({
  selector: 'wall-item-page',
  templateUrl: 'wall-item.html',
})
export class WallItemPage {
  private upload: UploadModel;

  constructor(private navParams: NavParams) {
    this.upload = this.navParams.get("upload");
  }
}
