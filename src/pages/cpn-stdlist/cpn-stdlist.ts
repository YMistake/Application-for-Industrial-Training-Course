import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
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
  userdata: any;
  hostname: string;
  items: any;
  student: any;
  assessment = CpnAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    console.log(this.userdata);
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `id=${this.userdata.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'student-for-company',body,{headers: headers})
          .subscribe(data =>{
            this.student = JSON.parse(data['_body']).data;
          });
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CpnStdlistPage');
  }

}
