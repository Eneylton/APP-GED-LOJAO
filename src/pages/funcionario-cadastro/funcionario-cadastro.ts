import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-funcionario-cadastro',
  templateUrl: 'funcionario-cadastro.html',
})

export class FuncionarioCadastroPage {

  nome:                         string = "";
  cpf:                          string = "";
  fornecedor_id:                any = "";
  fornecedores: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    this.fornecedores = [];
    this.listarFornecedores();
    
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

  cadastrar() {

    if(this.nome ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();
  
  }

  let body = {
    
    nome:           this.nome,
    cpf:            this.cpf,
    fornecedor_id:  this.fornecedor_id,
    crud: 'adicionar'
  };

  this.serve.postData(body, 'funcionario.php').subscribe(data => {

    this.showInsertOk();
  });

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
            
            this.navCtrl.setRoot('HomePage');
          }
        }
      ]
    });
    alert.present();
  }

}


