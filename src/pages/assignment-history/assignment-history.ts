import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the AssignmentHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-assignment-history',
  templateUrl: 'assignment-history.html'
})
export class AssignmentHistoryPage {
  id: any;
  items: any;
  hostname: string;
  company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = navParams.get("id");
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `id=${this.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'assignment_history',body,{headers: headers})
          .subscribe(data =>{
            this.company = JSON.parse(data['_body']).company;
          });
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentHistoryPage');
  }

}
