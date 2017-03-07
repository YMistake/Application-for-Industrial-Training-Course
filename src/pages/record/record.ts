import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AcademicPage } from '../academic/academic';

/*
  Generated class for the Record page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {

  academic = AcademicPage;
  items:any;
  year:any;
  hostname:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname
        },error=>{
            console.log(error);// Error getting the data
        } );
    this.http.get(this.hostname + 'record')
      .subscribe(data =>{
        this.year = JSON.parse(data['_body']);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
  }

}
