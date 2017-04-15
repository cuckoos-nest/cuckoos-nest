import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebcamPage } from './webcam.page';

@NgModule({
  declarations: [
    WebcamPage,
  ],
  imports: [
    IonicPageModule.forChild(WebcamPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    WebcamPage
  ]
})
export class WebcamPageModule {}
