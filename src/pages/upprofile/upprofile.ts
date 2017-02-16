import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';
/*
  Generated class for the Upprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upprofile',
  templateUrl: 'upprofile.html'
})
export class UpprofilePage {
  upprofile = UpprofilePage;
  temp = "assets/image/DefaultProfile.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpprofilePage');
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Profile is updated',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}
  getPicture() {
    let options = {
      destinationType   : Camera.DestinationType.DATA_URL,
      sourceType        : Camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    Camera.getPicture(options).then((imageData) => {
     let base64Image = "data:image/jpeg;base64," + imageData;
     this.temp = base64Image;
    }, (err) => {
  });

  }


}
