import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-usuario-perfil',
  templateUrl: 'usuario-perfil.html',
})

export class UsuarioPerfilPage {

  
  log:any;
  membros:any;

  nome:      string ="";
  email:     string ="";



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
      email:this.log.email,
      usuario:this.log.usuario,
      senha:this.log.senha,

      crud:'listar-perfil'
    }

    this.serve.postData(body, 'perfil.php').subscribe((data:any) => {
    
      this.membros = data.profiles;
      this.nome = data.profiles["nome"];
      this.email = data.profiles["email"];
      

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
