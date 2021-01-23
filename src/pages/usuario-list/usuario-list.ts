import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-usuario-list',
  templateUrl: 'usuario-list.html',
})

export class UsuarioListPage {

  log:any;
  nivel:string = "";

  limit: number = 10;
  start: number = 0;


  usuarios: any = [];

  todos: Array<{id:any, nome: string, email: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}

ionViewDidLoad() {

  this.storage.get('session_storage').then((res)=>{

    this.log = res;
    this.nivel = this.log.nivel;
    
    
  });
  
  this.usuarios = [];
  this.start = 0;
  this.listarUsuarios();
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
    this.listarUsuarios().then(() => {
      event.complete();
    })
  }, 1000);
}

listarUsuarios() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-usuarios'
    };
    this.serve.postData(body, 'usuarios.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.usuarios.push({
              id:            data.result[i]["id"],
              nome:          data.result[i]["nome"],
              email:         data.result[i]["email"],
              usuario:       data.result[i]["usuario"],
              senha:         data.result[i]["senha"],
              sobrenome:     data.result[i]["sobrenome"],
              telefone:      data.result[i]["telefone"],
              cep:           data.result[i]["cep"],
              endereco:      data.result[i]["endereco"],
              numero:        data.result[i]["numero"],
              bairro:        data.result[i]["bairro"],
              cidade:        data.result[i]["cidade"],
              estado:        data.result[i]["estado"],
              complemento:   data.result[i]["complemento"],
              nivel:         data.result[i]["nivel"],
              genero:        data.result[i]["genero"]

        });

      }

      })

      this.todos = this.usuarios;

      resolve(true);

    });

}

getUsuarios(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.usuarios = this.todos.filter((user) => {
      return (user.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (user.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.usuarios = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('UsuarioInsertPage');
}



perfil(id, 
       nome,
       email,
       usuario,
       senha,
       sobrenome,
       telefone,
       cep,
       endereco,
       numero,
       bairro,
       estado,
       cidade,
       complemento,
       nivel,
       genero
      
       ){

  this.navCtrl.push('UsuarioDetalhesPage', {
    id:               id,
    nome:             nome,
    email:            email,
    usuario:          usuario,
    senha:            senha,
    sobrenome:        sobrenome,
    telefone:         telefone,
    cep:              cep,
    endereco:         endereco,
    numero:           numero,
    bairro:           bairro,
    cidade:           cidade,
    estado:           estado,
    complemento:      complemento,
    nivel:            nivel,
    genero:           genero

  })

}
editar( id, 
        nome,
        email,
        usuario,
        senha,
        sobrenome,
        telefone,
        cep,
        endereco,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        nivel,
        genero
 
  ){

  this.navCtrl.push('UsuarioEditPage', {
    id:               id,
    nome:             nome,
    email:            email,
    usuario:          usuario,
    senha:            senha,
    sobrenome:        sobrenome,
    telefone:         telefone,
    cep:              cep,
    endereco:         endereco,
    numero:           numero,
    bairro:           bairro,
    cidade:           cidade,
    estado:           estado,
    complemento:      complemento,
    nivel:            nivel,
    genero:           genero

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'usuarios.php').subscribe(data =>{
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
          this.navCtrl.setRoot('CategoriaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}