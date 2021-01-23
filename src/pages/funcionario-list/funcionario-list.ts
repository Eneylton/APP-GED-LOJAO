import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-funcionario-list',
  templateUrl: 'funcionario-list.html',
})

export class FuncionarioListPage {


  log:any;
  nivel:string = "";
 
  limit: number = 10;
  start: number = 0;
  url: string = "";
  funcionarios: any = [];

  todos: Array<{id:any, nome: string, cpf: string }>;

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

  this.funcionarios = [];
  this.start = 0;
  this.listarFuncionarios();
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
    this.listarFuncionarios().then(() => {
      event.complete();
    })
  }, 1000);
}

listarFuncionarios() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-funcionarios'
    };
    this.serve.postData(body, 'funcionario.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.funcionarios.push({
              id:                     data.result[i]["id"],
              nome:                   data.result[i]["nome"],
              cpf:                    data.result[i]["cpf"],
              fornecedor_id:          data.result[i]["fornecedor_id"]
              

        });

      }

      })

      this.todos = this.funcionarios;

      resolve(true);

    });

}

getFuncionarios(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.funcionarios = this.todos.filter((user) => {
      return (user.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (user.cpf.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.funcionarios = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('FuncionarioCadastroPage');
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
  cpf,
  fornecedor_id
  ){

this.navCtrl.push('FuncionarioEditPage', {
id:                        id,
nome:                      nome,
cpf:                       cpf,
fornecedor_id:             fornecedor_id
})

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'funcionario.php').subscribe(data =>{
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
          this.navCtrl.setRoot('FuncionarioListPage');
        }
      }
    ]
  });
  alert.present();
}

}