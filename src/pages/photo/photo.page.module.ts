import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoPage } from './photo.page';

@NgModule({
  declarations: [
    PhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    PhotoPage
  ]
})
export class PhotoPageModule {}
