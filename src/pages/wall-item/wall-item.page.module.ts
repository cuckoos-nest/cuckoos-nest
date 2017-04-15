import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallItemPage } from './wall-item.page';

@NgModule({
  declarations: [
    WallItemPage,
  ],
  imports: [
    IonicPageModule.forChild(WallItemPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    WallItemPage
  ]
})
export class WallItemPageModule {}
