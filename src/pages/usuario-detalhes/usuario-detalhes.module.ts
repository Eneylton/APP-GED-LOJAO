import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioDetalhesPage } from './usuario-detalhes';

@NgModule({
  declarations: [
    UsuarioDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioDetalhesPage),
  ],
})
export class UsuarioDetalhesPageModule {}
