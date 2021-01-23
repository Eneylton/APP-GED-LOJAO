import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioEditPage } from './usuario-edit';

@NgModule({
  declarations: [
    UsuarioEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioEditPage),
  ],
})
export class UsuarioEditPageModule {}
