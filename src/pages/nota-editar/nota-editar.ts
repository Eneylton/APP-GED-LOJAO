import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-nota-editar',
  templateUrl: 'nota-editar.html',
})
export class NotaEditarPage {

  log:               any;
  id:                number;
  numero:            string = "";
  foto:              string = "";
  usuario_id:        string = "";
  fornecedor_id:     any    = "";
  funcionario_id:    any    = "";
  fornecedores:      any = [];
  funcionarios:      any = [];

  base64Image :      string = "";
  cameraData:        string = "";
  url:               string = "";




  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}



ionViewDidLoad() {
  
  this.listarFornecedores();
  this.listarFuncionarios();

  this.id               = this.navParams.get('id');
  this.numero           = this.navParams.get('numero');
  this.foto             = this.navParams.get('foto');
  this.fornecedor_id    = this.navParams.get('fornecedor_id');
  this.funcionario_id   = this.navParams.get('funcionario_id');

  this.fornecedores = [];
  this.funcionarios = [];
  
  
}

presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Abrir Midia',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.abrirCamrera();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.abrirGaleria();
        }

      }
    ]
  });

  actionSheet.present();
}


abrirCamrera() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}


abrirGaleria() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

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



editar(){
  if(this.cameraData === ''){
  let body ={
    id:        this.id,
    numero: this.numero,
    fornecedor_id: this.fornecedor_id,
    funcionario_id: this.funcionario_id,
    foto:      this.foto,
    crud:      'editar2'
  };
  
  this.serve.postData(body, 'nota.php').subscribe((data:any) =>{
    
    this.showInsertOk();
    
  });
  
  
}else{
  let body ={
    id:         this.id,
    numero:     this.numero,
    fornecedor_id: this.fornecedor_id,
    funcionario_id: this.funcionario_id,
    foto:       this.cameraData,
    crud:      'editar'
  };

  this.serve.postData(body, 'nota.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });

}

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
          this.navCtrl.setRoot('NotaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}