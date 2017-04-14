import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUploadPage } from './edit-upload.page';

@NgModule({
  declarations: [
    EditUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUploadPage),
  ],
  exports: [
    EditUploadPage
  ]
})
export class EditUploadPageModule {}
