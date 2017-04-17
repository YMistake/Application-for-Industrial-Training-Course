import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AssignmentHistoryPage } from '../assignment-history/assignment-history';

/*
  Generated class for the AdminAssignCompanySelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-assign-company-select',
  templateUrl: 'admin-assign-company-select.html'
})
export class AdminAssignCompanySelectPage {
  items: any;
  hostname: string;
  company: any;
  list = [];
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.data = navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'assign_company/select_company')
          .subscribe(data =>{
            this.company = JSON.parse(data['_body']).company;
          });
        },error=>{
            console.log(error);// Error getting the data
        } );

  }

  insertUserToArray(item,item2){
  //check item.user and do stuff
    if(item2 == true){
      if(this.list.indexOf(item) == -1){
        this.list.push(item);
        console.log(this.list);
      }
    } else {
      if(this.list.indexOf(item) >= 0){
        this.list.splice(this.list.indexOf(item),1);
        console.log(this.list);
      }
    }
  }

  see(){
    this.navCtrl.push(AssignmentHistoryPage, {id: this.data.ID});
  }

  sendData(){
    let list = this.list;
    if (!list.length){
      let alert = this.alertCtrl.create({
        title: 'Submit Failed',
        subTitle: 'Please select company for this teacher.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `id=${this.data.ID}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      for (let list of this.list){
        body += `&company[]=${list}`;
      }
      this.http.post(this.hostname + 'assign_company/select_company', body, {headers: headers})
        .subscribe(
          data => {
            var report = JSON.parse(data['_body']).report;
            if(report == 1){
              let alert = this.alertCtrl.create({
                title: 'Assign Successfull',
                subTitle: 'This teacher has already assign the company.',
                buttons: [{text:'OK', handler: data => {this.navCtrl.pop()}}]
              });
              alert.present();
            } else {
              let alert = this.alertCtrl.create({
                title: 'Assign Failed',
                subTitle: 'Please check the server or database',
                buttons: [{text:'OK', handler: data => {this.navCtrl.pop()}}]
              });
              alert.present();
            }
          }
        )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAssignCompanySelectPage');
  }

}
