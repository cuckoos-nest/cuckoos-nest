import { ZoomableImageComponent } from './zoomable-image/zoomable-image.component';
import { ImageWithThumbnailComponent } from './image-with-thumbnail/image-with-thumbnail.component';
import { TranslateStaticLoader } from 'ng2-translate';
import { TranslateLoader } from 'ng2-translate';
import { Http } from '@angular/http';
import { TranslateModule } from 'ng2-translate';
import { WallItemComponent } from './wall-item/wall-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CommonModule } from "@angular/common"; 

@NgModule({
  declarations: [
    GalleryComponent,
    WallItemComponent,
    ImageWithThumbnailComponent,
    ZoomableImageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    GalleryComponent,
    WallItemComponent,
    TranslateModule,
    ImageWithThumbnailComponent,
    ZoomableImageComponent,
  ]
})
export class ComponentsModule {}
