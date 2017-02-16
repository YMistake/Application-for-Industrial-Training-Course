import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CpnAss page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cpn-ass',
  templateUrl: 'cpn-ass.html'
})
export class CpnAssPage {
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CpnAssPage');
  }

}
