import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
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
  hostname: string;
  items: any;
  company = TeaComPage;
  CName = ["P&P","KMITL","Thai Airways"]; //บริษัทที่อยู่ในความดูแลของอาจารย์คนนั้นๆ

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
    console.log('ionViewDidLoad TeaSpvsPage');
  }

}
