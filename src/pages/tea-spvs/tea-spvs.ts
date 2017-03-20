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
  userdata: any;
  company = TeaComPage;
  CName: any; //บริษัทที่อยู่ในความดูแลของอาจารย์คนนั้นๆ

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `id=${this.userdata.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'teacher_supervision',body,{headers: headers})
          .subscribe(data =>{
            this.CName = JSON.parse(data['_body']).CName;
          });
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaSpvsPage');
  }

}
