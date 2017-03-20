import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
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
  items: any;
  hostname: string;
  CName: any;

  CData: any;
  Address: any;
  Telephone: any;
  SpvName: any;
  SpvPosition: any;
  SpvTel: any;

  SData: any;

  assessment = TeaAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.CName = navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `CName=${this.CName}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'teacher_supervision/company',body,{headers: headers})
          .subscribe(data =>{
            this.CData = JSON.parse(data['_body']).CData;
            this.SData = JSON.parse(data['_body']).SData;
            this.Address = this.CData[0].CAddress;
            this.Telephone = this.CData[0].CTel;
            this.SpvName = this.CData[0].SpvName;
            this.SpvPosition = this.CData[0].SpvPosition;
            this.SpvTel = this.CData[0].SpvTel;
            console.log(this.SData);
          });
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaComPage');
  }

}
