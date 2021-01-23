import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-nota-cadastro',
  templateUrl: 'nota-cadastro.html',
})

export class NotaCadastroPage {

 
  log:               any;

  imagens:           any=[];
  
  numero:            number;
  fornecedor:        string = "";
  usuario_id:        string = "";
  fornecedor_id:     any    = "";
  funcionario_id:    any    = "";
  fornecedores:      any = [];
  funcionarios:      any = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
   
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuario_id = this.log.id;
      
      
    });

    
    this.fornecedores = [];
    this.funcionarios = [];
    this.listarFornecedores();
    this.listarFuncionarios();

  }


  

  listarFornecedores(){
    
    let body = {
      
      crud:'listar-fornecedor2'
    }

    this.serve.postData(body,'fornecedor.php').subscribe((data:any)=>{

      for(let item of data.result){
          this.fornecedores.push({
          id:item.id,
          nome:item.nome
        })

      }
    })
    
  }

  listarFuncionarios() {
    let body = {
      fornecedor_id:this.fornecedor_id,
      crud:'listar-funcionarios2'
    }

    this.serve.postData(body,'funcionario.php').subscribe((data:any)=>{

      for(let item of data.result){
          this.funcionarios.push({
          id:item.id,
          nome:item.nome
        })

      }
    })
    
  }


  cadastrar() {

    if(this.numero === undefined){
      
      const toast = this.toastyCrtl.create({
      message: 'Por Favor Digite o Nº da nota físcal...',  
      duration:3000
      });

      toast.present();


   }else{

  let body = {
    
    numero:      this.numero,
    usuario_id:  this.usuario_id,
    fornecedor_id:  this.fornecedor_id,
    funcionario_id:  this.funcionario_id,
    crud: 'adicionar'
  };

  this.serve.postData(body, 'nota.php').subscribe(data => {

    this.showInsertOk();
  });

  }
}

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
            this.navCtrl.setRoot('NotaListarPage');
          }
        }
      ]
    });
    alert.present();
  }

}

