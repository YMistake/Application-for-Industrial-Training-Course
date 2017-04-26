import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { AdminApprovePage } from '../admin-approve/admin-approve';
/*
  Generated class for the AdminConfirm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-confirm',
  templateUrl: 'admin-confirm.html'
})
export class AdminConfirmPage {
  items: any;
  hostname: string;
  name: any;
  student: any;
  address: any;
  SFirstname: any;
  SLastname: any;
  tel: any;
  img: any;
  list = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http) {
    this.name = navParams.data;
    this.http.get("assets/server.json")
      .subscribe( data => {
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `CID=${this.name.CID}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'approve/confirm', body, {headers: headers})
          .subscribe(data => {
            this.student = JSON.parse(data['_body']).data;
            this.img = JSON.parse(data['_body']).img;
            this.address = this.student[0].CompanyAddress;
            this.tel = this.student[0].CompanyTels;
            this.SFirstname = JSON.parse(data['_body']).SFirstname;
            this.SLastname = JSON.parse(data['_body']).SLastname;
            for (let list of this.student){
              this.list.push(list.SID);
            }
          })
      })
  }

  approve(){
    let body = `CID=${this.name.CID}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'approve/confirm/yes', body, {headers: headers})
      .subscribe(data => {
        var report = JSON.parse(data['_body']).report;
        if(report == 1){
          this.presentToast("Approve Successfull");
          this.navCtrl.setRoot(AdminApprovePage);
        } else {
          this.presentToast("Failed, please check the server");
        }
      })
  }

  disapprove(){
    let body = `CID=${this.name.CID}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    for (let list of this.list){
      body += `&list[]=${list}`;
    }
    this.http.post(this.hostname + 'approve/confirm/no', body, {headers: headers})
      .subscribe(data => {
        var report = JSON.parse(data['_body']).report;
        if(report == 1){
          this.presentToast("Disapprove Successfull");
          this.navCtrl.setRoot(AdminApprovePage);
        } else {
          this.presentToast("Failed, please check the server");
        }
      })
  }


  presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConfirmPage');
  }

}
