import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications.page';

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    NotificationsPage
  ]
})
export class NotificationsPageModule {}
