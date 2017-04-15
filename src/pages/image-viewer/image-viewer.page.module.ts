import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewerPage } from './image-viewer.page';

@NgModule({
  declarations: [
    ImageViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageViewerPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    ImageViewerPage
  ]
})
export class ImageViewerPageModule {}
