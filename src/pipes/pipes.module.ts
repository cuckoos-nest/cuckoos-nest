import { TranslateLoader } from 'ng2-translate';
import { TranslateStaticLoader } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { UploadImagePipe } from './upload-image.pipe';
import { UserPipe } from './user.pipe';
import { OrderByPipe } from './order-by.pipe';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

@NgModule({
  declarations: [
    OrderByPipe,
    UploadImagePipe,
    UserPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    OrderByPipe,
    UploadImagePipe,
    UserPipe,
  ]
})
export class PipesModule { }
