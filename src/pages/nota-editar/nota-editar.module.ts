import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotaEditarPage } from './nota-editar';

@NgModule({
  declarations: [
    NotaEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(NotaEditarPage),
  ],
})
export class NotaEditarPageModule {}
