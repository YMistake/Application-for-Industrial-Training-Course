import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/*
  Generated class for the Review page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Successfull',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();

}
}
