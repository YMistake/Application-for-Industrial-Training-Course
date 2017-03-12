import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the StudentInfor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-infor',
  templateUrl: 'student-infor.html'
})
export class StudentInforPage {
  student: any;
  firstname: string;
  lastname: string;
  userid: any;
  items: any;
  hostname: string;

  information: any;

  picture:any;
  company: string;
  position: string;
  tel: string;
  facebook: string;
  line: string;
  Work_Environment: any;
  Travel: any;
  Bistro: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.student=navParams.data;
    console.log(this.student);
    this.userid = this.student[0].Id;
    this.firstname = this.student[0].Firstname;
    this.lastname = this.student[0].Lastname;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `id=${this.userid}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'record/company/student/information',body,{headers: headers})
          .subscribe(data =>{
          this.information = JSON.parse(data['_body']).data;
          this.picture = this.information[0].picture;
          this.company = this.information[0].CName;
          this.position = this.information[0].SPosition;
          this.tel = this.information[0].STel;
          this.facebook = this.information[0].SFacebook;
          this.line = this.information[0].SLine;
          this.Work_Environment = this.information[0].Work_Environment;
          this.Travel = this.information[0].Travel;
          this.Bistro = this.information[0].Bistro;
          });
        },error=>{
            console.log(error);// Error getting the data
        } );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentInformation');
  }

}
