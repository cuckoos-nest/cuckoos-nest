import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsPage } from './comments.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ServicesModule } from '../../services/services.module';

@NgModule({
  declarations: [
    CommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    CommentsPage
  ]
})
export class CommentsPageModule {}
