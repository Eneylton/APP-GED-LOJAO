import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPerfilPage } from './usuario-perfil';

@NgModule({
  declarations: [
    UsuarioPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPerfilPage),
  ],
})
export class UsuarioPerfilPageModule {}
