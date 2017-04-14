import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallItemPage } from './wall-item.page';

@NgModule({
  declarations: [
    WallItemPage,
  ],
  imports: [
    IonicPageModule.forChild(WallItemPage),
  ],
  exports: [
    WallItemPage
  ]
})
export class WallItemPageModule {}
