import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotaCadastroPage } from './nota-cadastro';

@NgModule({
  declarations: [
    NotaCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(NotaCadastroPage),
  ],
})
export class NotaCadastroPageModule {}
