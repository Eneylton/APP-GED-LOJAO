import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPerfilEditPage } from './usuario-perfil-edit';

@NgModule({
  declarations: [
    UsuarioPerfilEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPerfilEditPage),
  ],
})
export class UsuarioPerfilEditPageModule {}
