import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AdminAssignCompanySelectPage } from '../admin-assign-company-select/admin-assign-company-select';

/*
  Generated class for the AdminAssignCompany page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-assign-company',
  templateUrl: 'admin-assign-company.html'
})
export class AdminAssignCompanyPage {
  items: any;
  hostname: string;
  teacher: any;
  selectCompany = AdminAssignCompanySelectPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'assign_company')
          .subscribe(data =>{
            this.teacher = JSON.parse(data['_body']).teacher;
          });
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAssignCompanyPage');
  }

}
