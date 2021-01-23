import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioInsertPage } from './usuario-insert';

@NgModule({
  declarations: [
    UsuarioInsertPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioInsertPage),
  ],
})
export class UsuarioInsertPageModule {}
