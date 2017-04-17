import { Component,Input } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { TabPage } from '../tab/tab';
import { LoginPage } from '../login/login';

/*
  Generated class for the SignupCompany page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-company',
  templateUrl: 'signup-company.html'
})
export class SignupCompanyPage {
  info: any;
  items: any;
  hostname: string;
  company = [];
  TelPattern=/0([869])([0-9]{8})/;
  PositionPattern=/\w/;
  @Input() Position;
  @Input() Tel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.info = navParams.data;
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'signup-company', {headers: headers})
          .subscribe(
            data => {
                this.company = JSON.parse(data['_body']).company;
                console.log(this.company);
            }
          )
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  confirm(item){
    if(this.Position == null || this.Position.trim()=="" || this.Tel == null || this.Tel.trim()==""){
      let alert = this.alertCtrl.create({
        subTitle: 'Please insert your Position and Telephone',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Please confirm',
        message: 'Are you sure this is you company? If you have already chosen this company. You cannot edit it anymore.',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.sendData(item);
            }
          }
        ]
      });
      confirm.present();
    }
  }

  sendData(item){
    let body = `id=${this.info.id}&Firstname=${this.info.firstname}&Lastname=${this.info.lastname}&Email=${this.info.email}&Role=${this.info.role}&Picture=${this.info.picture}&CompanyName=${item}&Position=${this.Position}&Tel=${this.Tel}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'signup-company2',body, {headers: headers})
      .subscribe(
        data => {
            var report = JSON.parse(data['_body']).report;
            if (report == 1){
              this.navCtrl.setRoot(TabPage);
            } else {
              let alert = this.alertCtrl.create({
                title: 'Signup Failed',
                subTitle: 'Please contact administrator!',
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.setRoot(LoginPage);
            }
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupCompanyPage');
  }

}
