import { TranslateModule } from 'ng2-translate';
import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallPage } from './wall.page';

@NgModule({
  declarations: [
    WallPage,
  ],
  imports: [
    IonicPageModule.forChild(WallPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    WallPage
  ]
})
export class WallPageModule {}
