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
  CompanyName: any;

  CData: any;
  Address: any;
  Telephone: any;
  SpvFirstname: any;
  SpvLastname: any;
  SpvPosition: any;
  SpvTel: any;

  SpvData: any;
  StdData: any;

  assessment = TeaAssPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.CompanyName = navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `CompanyName=${this.CompanyName}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'teacher_supervision/company',body,{headers: headers})
          .subscribe(data =>{
            this.CData = JSON.parse(data['_body']).CData;
            this.SpvData = JSON.parse(data['_body']).SpvData;
            this.StdData = JSON.parse(data['_body']).StdData;
            this.Address = this.CData[0].CompanyAddress;
            this.Telephone = this.CData[0].CompanyTels;
            this.SpvFirstname = this.SpvData[0].Firstname;
            this.SpvLastname = this.SpvData[0].Lastname;
            this.SpvPosition = this.SpvData[0].Position;
            this.SpvTel = this.SpvData[0].Tel;
          });
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaComPage');
  }

}
