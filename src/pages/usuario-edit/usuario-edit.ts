import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { HttpClient, } from '@angular/common/http';
import 'rxjs/add/operator/map';


@IonicPage({})
@Component({
  selector: 'page-usuario-edit',
  templateUrl: 'usuario-edit.html',
})


export class UsuarioEditPage {

   id:             number;
   nome:           string ="";
   email:          string ="";
   usuario:        string ="";
   senha:          string ="";
   sobrenome:      string ="";
   telefone:       string ="";
   cep:            string ="";
   endereco:       string ="";
   numero:         string ="";
   bairro:         string ="";
   cidade:         string ="";
   estado:         string ="";
   complemento:    string ="";
   nivel:          string ="";
   genero:         string ="";

  
  constructor(public navCtrl: NavController,public http: HttpClient,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}



ionViewDidLoad() {

  this. id               = this.navParams.get('id');
  this. nome             = this.navParams.get('nome');
  this. email            = this.navParams.get('email');
  this. usuario          = this.navParams.get('usuario');
  this. senha            = this.navParams.get('senha');
  this. sobrenome        = this.navParams.get('sobrenome');
  this. telefone         = this.navParams.get('telefone');
  this. cep              = this.navParams.get('cep');
  this. endereco         = this.navParams.get('endereco');
  this. numero           = this.navParams.get('numero');
  this. bairro           = this.navParams.get('bairro');
  this. cidade           = this.navParams.get('cidade');
  this. estado           = this.navParams.get('estado');
  this. complemento      = this.navParams.get('complemento');
  this. nivel            = this.navParams.get('nivel');
  this. genero           = this.navParams.get('genero');
}

buscarCep() {
  const cep = this.cep;

  this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .map(res => res).subscribe((data:any) => {
      console.log(data);

      this.endereco = data.logradouro;
      this.bairro = data.bairro;
      this.cidade = data.localidade;
      this.estado = data.uf;
     
    })

  }

editar(){

  let body ={
     id:              this.id,
     nome:            this.nome,
     email:           this.email,
     usuario:         this.usuario,
     senha:           this.senha,
     sobrenome:       this.sobrenome,
     telefone:        this.telefone,
     cep:             this.cep,
     endereco:        this.endereco,
     numero:          this.numero,
     bairro:          this.bairro,
     cidade:          this.cidade,
     estado:          this.estado,
     complemento:     this.complemento,
     nivel:           this.nivel,
     genero:          this.genero,

     crud: 'usuario-editar'
  };

  this.serve.postData(body, 'usuarios.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });
}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Seu Registro foi Atualizado',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('UsuarioListPage');
        }
      }
    ]
  });
  
  alert.present();
}

}
