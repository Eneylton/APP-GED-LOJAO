import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-galeria-doc',
  templateUrl: 'galeria-doc.html',
})
export class GaleriaDocPage {

  fotos: any = [];
  url: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private serve: ServiceProvider) {
    this.url = serve.serve;
    console.log(this.serve);
  }

  ionViewDidLoad() {

    this.fotos = [];

    this.listaFotos();

  }

  listaFotos() {


    return new Promise(resolve => {
      let body = {
        crud: 'listar-fotos'
      };
      this.serve.postData(body, 'galeria.php').subscribe((data: any) => {

        for (let i = 0; i < data.result.length; i++) {

          this.fotos.push({
            id:           data.result[i]["id"],
            nota_id:      data.result[i]["nota_id"],
            foto:         data.result[i]["foto"]
          });

          console.log(JSON.stringify(this.fotos));

        }

      })

      resolve(true);

    });

  }
}

