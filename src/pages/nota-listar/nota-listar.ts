import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';
import { HomePage } from '../home/home';


@IonicPage({})
@Component({
  selector: 'page-nota-listar',
  templateUrl: 'nota-listar.html',
})

export class NotaListarPage {

  log:any;
  nivel:string = "";

  limit: number = 4500;
  start: number = 0;

  notas: any = [];

  url: string = "";
 


  todos: Array<{id:any, numero: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
    
      this.url = serve.serve;

    }

ionViewDidLoad() {


  this.storage.get('session_storage').then((res)=>{

    this.log = res;
    this.nivel = this.log.nivel;
    
    
  });

  this.notas = [];
  this.start = 0;
  this.listarNotas();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarNotas().then(() => {
      event.complete();
    })
  }, 1000);
}

listarNotas() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-notas'
    };
    this.serve.postData(body, 'nota.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.notas.push({
              id:                 data.result[i]["id"],
              numero:             data.result[i]["numero"],
              data_recebimento:   data.result[i]["data_recebimento"],
              usuario_id:         data.result[i]["usuario_id"],
              fornecedor_id:      data.result[i]["fornecedor_id"],
              funcionario_id:     data.result[i]["funcionario_id"]

        });

      }

      })

      this.todos = this.notas;

      resolve(true);

    });

}


getNotas(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.notas = this.todos.filter((notas) => {
      return (notas.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.notas = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('NotaCadastroPage');
}

editar(id, 
       numero,
       foto,
       fornecedor_id,
       funcionario_id,
       usuario_id){

  this.navCtrl.push('NotaEditarPage', {
    id:                  id,
    numero:              numero,
    foto:                foto,
    fornecedor_id:       fornecedor_id,
    funcionario_id:      funcionario_id,
    usuario_id:          usuario_id

  })

}

anexar(id){

this.navCtrl.push('NotaAnexoPage', {

  id: id

})

}

foto(id){

this.navCtrl.push(HomePage, {
id: id

})

}

detalhe(id, numero,foto,fornecedor_id, funcionario_id, usuario_id){

  this.navCtrl.push('NotaDetalhePage', {
    id:                  id,
    numero:              numero,
    foto:                foto,
    fornecedor_id:       fornecedor_id,
    funcionario_id:      funcionario_id,
    usuario_id:          usuario_id

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'nota.php').subscribe(data =>{
    this.showInsertOk();
  });

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('NotaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}

