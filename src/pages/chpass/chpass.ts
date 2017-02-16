import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Chpass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chpass',
  templateUrl: 'chpass.html'
})
export class ChpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChpassPage');
  }

  showAlert() {
  let alert = this.alertCtrl.create({
    subTitle: 'Your password has been changed.',
    buttons: ['OK']
  });
  alert.present();
}


}
