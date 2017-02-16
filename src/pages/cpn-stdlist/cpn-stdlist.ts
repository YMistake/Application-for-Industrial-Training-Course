import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CpnAssPage } from '../cpn-ass/cpn-ass';
/*
  Generated class for the CpnStdlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cpn-stdlist',
  templateUrl: 'cpn-stdlist.html'
})
export class CpnStdlistPage {
  data = ["ice","nu"];
  assessment = CpnAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CpnStdlistPage');
  }

}
