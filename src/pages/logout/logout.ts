import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {
    console.log('ionViewDidLoad LogoutPage');
    localStorage.removeItem("userdata");
    localStorage.removeItem("role");
    location.reload();
    this.navCtrl.setRoot(LoginPage)
  }

}
