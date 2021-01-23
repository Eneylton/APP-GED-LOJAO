import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, IonicPage, NavController } from 'ionic-angular';


@IonicPage({})
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {


  base64Image : string = "";
  cameraData: string;

  constructor(public navCtrl: NavController,  private camera: Camera,  public actionSheetCtrl: ActionSheetController) {

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
      targetWidth:150,
      targetHeight:150,
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
      targetWidth:150,
      targetHeight:150,
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

}

