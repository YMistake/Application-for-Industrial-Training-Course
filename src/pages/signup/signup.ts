import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loginPage = LoginPage;
  items:any;
  hostname: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  @Input() username;
  @Input() password;
  @Input() password2;
  @Input() firstname;
  @Input() lastname;
  @Input() email;
  @Input() email2;
  @Input() role = "student";

  sendData(){
    let user = this.username;
    let pass = this.password;
    let pass2 = this.password2;
    let first = this.firstname;
    let last = this.lastname;
    let email = this.email;
    let email2 = this.email2;
    let role = this.role;
    console.log(role);
    //เพิ่มส่วนส่งไป backend
    let body = `user=${user}&pass=${pass}&first=${first}&last=${last}&email=${email}&role=${role}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'signup', body, {headers: headers})
      .subscribe(
        data => {
            var report = JSON.parse(data['_body']).report;
            console.log(report);
            if (report == 0){
              let alert = this.alertCtrl.create({
                title: 'Signup Failed',
                subTitle: 'That Username has been taken!',
                buttons: ['OK']
              });
              alert.present();
            } else {
              this.navCtrl.pop();
            }
        }
      )

  }

}
