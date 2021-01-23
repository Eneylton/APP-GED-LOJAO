import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';



@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  
  usuario: string;
  senha: string;

  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

 

  formLogin() {
    if (this.usuario != "" && this.senha != "") {
      
      let body = {
        usuario: this.usuario,
        senha: this.senha,
        crud: 'acessar'
      }

      this.serve.postData(body, 'login.php').subscribe((data:any) => {

        var alertperson = data.msg;

        if(data.success){

          this.storage.set('session_storage', data.result);
          this.navCtrl.setRoot('NotaListarPage');
          const toast = this.toastyCrtl.create({
            message:'Login Efetuado com Sucesso !!',
            duration:3000
          });
          toast.present();

        }else{

          const toast = this.toastyCrtl.create({
            message: alertperson,
            duration:3000
          });
          toast.present();

        }
      
      });
    
    }else{

      const toast = this.toastyCrtl.create({
        message: 'Você Pricesa Preecher os Campos acima',  
        duration:3000
        });
        toast.present();


    }

  }

  
  formCadastro() {

    this.navCtrl.push('UsuarioInsertPage');
  }

}
 