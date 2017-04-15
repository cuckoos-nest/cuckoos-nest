import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenuPage } from './main-menu.page';

@NgModule({
  declarations: [
    MainMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MainMenuPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    MainMenuPage
  ]
})
export class MainMenuPageModule {}
