import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { CompanyStudentPage } from '../company-student/company-student';

/*
  Generated class for the Academic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-academic',
  templateUrl: 'academic.html'
})
export class AcademicPage {

  year: string;
  items: any;
  company: any;
  hostname: string;
  cs = CompanyStudentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.year=navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `year=${this.year}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'record/company',body,{headers: headers})
          .subscribe(data =>{
            this.company = JSON.parse(data['_body']).company;
          });
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcademicYear')
  }

}
