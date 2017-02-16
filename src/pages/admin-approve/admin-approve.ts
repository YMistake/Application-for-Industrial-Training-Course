import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminConfirmPage } from '../admin-confirm/admin-confirm';
/*
  Generated class for the AdminApprove page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-approve',
  templateUrl: 'admin-approve.html'
})
export class AdminApprovePage {
  confirm = AdminConfirmPage;
  items=["P&P","Thai Airway"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminApprovePage');
  }

}
