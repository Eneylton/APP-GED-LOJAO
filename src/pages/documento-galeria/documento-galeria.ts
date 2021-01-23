import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-documento-galeria',
  templateUrl: 'documento-galeria.html',
})
export class DocumentoGaleriaPage {

  id:                number;
  url:               string = "";
  imagens:           any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private serve: ServiceProvider) {
    this.url = serve.serve;
    console.log(this.serve);
  }

  ionViewDidLoad() {

    this.id = this.navParams.get('id');
    this.imagens = [];
    this.listarDocumentos();
   
  }

  listarDocumentos() {

    return new Promise(resolve => {
      let body = {
        nota_id: this.id,
        crud: 'listar-documentos'
      };

      this.serve.postData(body, 'galeria.php').subscribe((data:any)=> {
       
        for (let i = 0; i < data.result.length; i++) {
  
          this.imagens.push({
                id:                     data.result[i]["id"],
                nota_id:                data.result[i]["nota_id"],
                foto:                   data.result[i]["foto"]
                
  
          });
  
        }
  
        })
  
        resolve(true);
  
      });
  
  }

}
