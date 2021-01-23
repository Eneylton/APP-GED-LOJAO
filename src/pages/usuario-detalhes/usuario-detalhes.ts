import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-usuario-detalhes',
  templateUrl: 'usuario-detalhes.html',
})
export class UsuarioDetalhesPage {

  log:any;
  membros:any;

  id:             number;
  nome:           string ="";
  sobrenome:      string ="";
  telefone:       string ="";
  cep:            string ="";
  endereco:       string ="";
  numero:         string ="";
  bairro:         string ="";
  cidade:         string ="";
  estado:         string ="";
  email:          string ="";
  genero:         string ="";
  nivel:         string ="";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    private appCtrol:  App,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter(){

    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.load();
    

    });

  }

  load(){
    let body ={
      id:this.log.id,
      nome:this.log.nome,
      sobrenome:this.log.sobrenome,
      genero:this.log.genero,
      foto:this.log.foto,
      
      crud:'listar-perfil'
    }

    this.serve.postData(body, 'perfil.php').subscribe((data:any) => {
    
      this.membros              = data.profiles;
      this.nome                 = data.profiles["nome"];
      this.sobrenome            = data.profiles["sobrenome"];
      this.email                = data.profiles["email"];
      this.telefone             = data.profiles["telefone"];
      this.genero               = data.profiles["genero"];
      this.cep                  = data.profiles["cep"];
      this.endereco             = data.profiles["endereco"];
      this.numero               = data.profiles["numero"];
      this.bairro               = data.profiles["bairro"];
      this.cidade               = data.profiles["cidade"];
      this.estado               = data.profiles["estado"];
      this.nivel                = data.profiles["nivel"];
    
    });

  }

  openPerfil(){
    this.navCtrl.push('UsuarioPerfilEditPage');
  }

  logaout(){
    this.storage.clear();
    this.appCtrol.getRootNav().setRoot('LoginPage');

    const toast = this.toastyCrtl.create({
      message:'Você Encerrou sua sessão !!',
      duration:3000
    });
    toast.present();

  }

}