import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AdminChangeStatusPage } from '../admin-change-status/admin-change-status';
import { AdminChangeStatus2Page } from '../admin-change-status2/admin-change-status2';
/*
  Generated class for the AdminApproveHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-approve-history',
  templateUrl: 'admin-approve-history.html'
})
export class AdminApproveHistoryPage {
  changeApprove = AdminChangeStatusPage;
  changeDisapprove = AdminChangeStatus2Page;
  items: any;
  hostname: string;
  approve: any;
  disapprove: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
      .subscribe( data => {
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'approve_history')
          .subscribe(data => {
            this.approve = JSON.parse(data['_body']).approve;
            this.disapprove = JSON.parse(data['_body']).disapprove;
          })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminApproveHistoryPage');
  }

}
