import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeaAssPage } from '../tea-ass/tea-ass';
/*
  Generated class for the TeaCom page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tea-com',
  templateUrl: 'tea-com.html'
})
export class TeaComPage {
  name: string;
  data = ["ice","nu"];
  assessment = TeaAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaComPage');
  }

}
