import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { StudentInforPage } from '../student-infor/student-infor';
/*
  Generated class for the CompanyStudent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-company-student',
  templateUrl: 'company-student.html'
})
export class CompanyStudentPage {
  data: any;
  si = StudentInforPage;
  items: any;
  hostname: string;
  student: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data=navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `company=${this.data.CompanyName}&year=${this.data.year}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'record/company/student',body,{headers: headers})
          .subscribe(data =>{
          this.student = JSON.parse(data['_body']).data;

          console.log(this.student);
          });
        },error=>{
            console.log(error);// Error getting the data
        } );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyStudentPage');
  }

}
