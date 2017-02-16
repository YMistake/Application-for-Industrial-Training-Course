import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Fgpass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fgpass',
  templateUrl: 'fgpass.html'
})
export class FgpassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FgpassPage');
  }

    showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Your password will send to your E-mail address.',
      buttons: ['OK']
    });
    alert.present();
  }

}
