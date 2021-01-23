import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorEditPage } from './fornecedor-edit';

@NgModule({
  declarations: [
    FornecedorEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorEditPage),
  ],
})
export class FornecedorEditPageModule {}
