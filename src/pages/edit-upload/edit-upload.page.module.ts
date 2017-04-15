import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUploadPage } from './edit-upload.page';

@NgModule({
  declarations: [
    EditUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUploadPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    EditUploadPage
  ]
})
export class EditUploadPageModule {}
