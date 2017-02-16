import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeaComPage } from '../tea-com/tea-com';

/*
  Generated class for the TeaSpvs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tea-spvs',
  templateUrl: 'tea-spvs.html'
})
export class TeaSpvsPage {
  company = TeaComPage;
  items = ["P&P","KMITL","Thai Airways"]; //บริษัทที่อยู่ในความดูแลของอาจารย์คนนั้นๆ

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaSpvsPage');
  }

}
