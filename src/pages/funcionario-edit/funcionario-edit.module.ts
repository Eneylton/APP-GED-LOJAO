import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioEditPage } from './funcionario-edit';

@NgModule({
  declarations: [
    FuncionarioEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioEditPage),
  ],
})
export class FuncionarioEditPageModule {}
