import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorListPage } from './fornecedor-list';

@NgModule({
  declarations: [
    FornecedorListPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorListPage),
  ],
})
export class FornecedorListPageModule {}
