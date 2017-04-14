import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenuPage } from './main-menu.page';

@NgModule({
  declarations: [
    MainMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MainMenuPage),
  ],
  exports: [
    MainMenuPage
  ]
})
export class MainMenuPageModule {}
