import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user.page';

@NgModule({
  declarations: [
    UserPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    UserPage
  ]
})
export class UserPageModule {}
