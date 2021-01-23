import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioCadastroPage } from './funcionario-cadastro';

@NgModule({
  declarations: [
    FuncionarioCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioCadastroPage),
  ],
})
export class FuncionarioCadastroPageModule {}
