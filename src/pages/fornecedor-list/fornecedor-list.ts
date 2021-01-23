import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-fornecedor-list',
  templateUrl: 'fornecedor-list.html',
})

export class FornecedorListPage {

  log:any;
  nivel:string = "";

 
  limit: number = 10;
  start: number = 0;
  url: string = "";
  fornecedores: any = [];

  todos: Array<{id:any, nome: string, email: string }>;

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
  
  this.fornecedores = [];
  this.start = 0;
  this.listarFornecedores();
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
    this.listarFornecedores().then(() => {
      event.complete();
    })
  }, 1000);
}

listarFornecedores() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-Fornecedores'
    };
    this.serve.postData(body, 'fornecedor.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.fornecedores.push({
              id:            data.result[i]["id"],
              nome:          data.result[i]["nome"],
              email:         data.result[i]["email"],
              foto:          data.result[i]["foto"]
              

        });

      }

      })

      this.todos = this.fornecedores;

      resolve(true);

    });

}

getFornecedores(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.fornecedores = this.todos.filter((user) => {
      return (user.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (user.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.fornecedores = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('FornecedorCadastroPage');
}

perfil(id, 
       nome,
       email,
       foto
       ){

  this.navCtrl.push('UsuarioDetalhesPage', {
    id:               id,
    nome:             nome,
    email:            email,
    foto:             foto
  })

}

editar(id, 
  nome,
  email,
  foto
  ){

this.navCtrl.push('FornecedorEditPage', {
id:               id,
nome:             nome,
email:            email,
foto:             foto
})

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'fornecedor.php').subscribe(data =>{
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
          this.navCtrl.setRoot('FornecedorListPage');
        }
      }
    ]
  });
  alert.present();
}

}