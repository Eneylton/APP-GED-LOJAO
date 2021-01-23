import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentoGaleriaPage } from './documento-galeria';

@NgModule({
  declarations: [
    DocumentoGaleriaPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentoGaleriaPage),
  ],
})
export class DocumentoGaleriaPageModule {}
