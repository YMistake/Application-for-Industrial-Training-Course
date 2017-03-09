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
  hostname: string;
  items: any;
  data = ["ice","nu"];
  assessment = CpnAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CpnStdlistPage');
  }

}
