import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AdminConfirmPage } from '../admin-confirm/admin-confirm';
import { AdminApproveHistoryPage } from '../admin-approve-history/admin-approve-history';
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
  items: any;
  hostname: string;
  company: any;
  confirm = AdminConfirmPage;
  history = AdminApproveHistoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
      .subscribe( data => {
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'approve')
          .subscribe(data => {
            this.company = JSON.parse(data['_body']).data;
          })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminApprovePage');
  }

}
