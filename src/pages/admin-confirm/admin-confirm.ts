import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdminConfirm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-confirm',
  templateUrl: 'admin-confirm.html'
})
export class AdminConfirmPage {
  name: string;
  items = ["56030323 นายยุคนธร ศรีประภา Com","56030269 นายณัฐพล ผลโพธิ์ Com"]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConfirmPage');
  }

}
