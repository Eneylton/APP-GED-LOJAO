import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotaListarPage } from './nota-listar';

@NgModule({
  declarations: [
    NotaListarPage,
  ],
  imports: [
    IonicPageModule.forChild(NotaListarPage),
  ],
})
export class NotaListarPageModule {}
