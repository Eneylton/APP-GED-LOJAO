import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioListPage } from './funcionario-list';

@NgModule({
  declarations: [
    FuncionarioListPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioListPage),
  ],
})
export class FuncionarioListPageModule {}
