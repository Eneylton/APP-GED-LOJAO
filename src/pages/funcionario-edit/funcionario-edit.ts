import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-funcionario-edit',
  templateUrl: 'funcionario-edit.html',
})

export class FuncionarioEditPage {
  id:                           number;
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

    this.id                  = this.navParams.get('id');
    this.nome                = this.navParams.get('nome');
    this.cpf                 = this.navParams.get('cpf');
    this.fornecedor_id       = this.navParams.get('fornecedor_id');

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

  editar(){
   
    let body ={
      id:                 this.id,
      nome:               this.nome,
      cpf:                this.cpf,
      fornecedor_id:      this.fornecedor_id,
      crud:      'editar'
    };
  
    this.serve.postData(body, 'funcionario.php').subscribe((data:any) =>{
    
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
            
            this.navCtrl.setRoot('FuncionarioListPage');
          }
        }
      ]
    });
    alert.present();
  }

}


