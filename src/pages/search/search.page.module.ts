import { ServicesModule } from './../../services/services.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search.page';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    ComponentsModule,
    PipesModule,
    ServicesModule,
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule {}
