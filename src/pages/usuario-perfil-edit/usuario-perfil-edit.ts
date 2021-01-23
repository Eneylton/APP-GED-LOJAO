import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-usuario-perfil-edit',
  templateUrl: 'usuario-perfil-edit.html',
})

export class UsuarioPerfilEditPage {

  
  log: any;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  genero: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  nivel: string;
 
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nome = this.log.nome;
      this.sobrenome = this.log.email;
      this.email = this.log.email;
      this.telefone = this.log.email;
      this.genero = this.log.email;
      this.cep = this.log.email;
      this.endereco = this.log.email;
      this.numero = this.log.email;
      this.bairro = this.log.email;
      this.cidade = this.log.email;
      this.estado = this.log.email;
      this.nivel = this.log.email;
    

    });
  }

  selectText(event){
    event.target.Select();
  }

  salvar(){

    let body = {

      id:           this.log.id,
      nome:         this.nome, 
      sobrenome:    this.sobrenome,
      email:        this.email,
      telefone:     this.telefone,
      genero:       this.genero,
      cep:          this.cep,
      endereco:     this.endereco,
      numero:       this.numero,
      bairro:       this.bairro,
      cidade:       this.cidade,
      estado:       this.estado,
      nivel:        this.nivel,

      crud: 'editar-perfil' 
    }

    this.serve.postData(body, 'perfil.php').subscribe(data => {
    
      this.log.nome            = this.nome;
      this.log.sobrenome       = this.sobrenome;
      this.log.email           = this.email;
      this.log.telefone        = this.telefone;
      this.log.genero          = this.genero;
      this.log.cep             = this.cep;
      this.log.endereco        = this.endereco;
      this.log.numero          = this.numero;
      this.log.bairro          = this.bairro;
      this.log.cidade          = this.cidade;
      this.log.estado          = this.estado;
      this.log.nivel           = this.nivel;
      this.storage.set('session_storage', this.log);

      this.navCtrl.push('UsuarioPerfilPage');

      const toast = this.toastyCrtl.create({
        message:'Atualização Realizada !!',
        duration:3000
      });
      toast.present();
      

    });

  }

}