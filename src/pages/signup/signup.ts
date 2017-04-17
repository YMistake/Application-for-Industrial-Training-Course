import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { TabPage } from '../tab/tab';
import { SignupCompanyPage } from '../signup-company/signup-company';
import { UpprofilePage } from '../upprofile/upprofile';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  id: any;
  picture: any;
  loginPage = LoginPage;
  items:any;
  hostname: string;
  EmailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.id = navParams.get("id"); // รับ id มาจากหน้า login
    this.firstname = navParams.get("firstname");
    this.lastname = navParams.get("lastname");
    this.email = navParams.get("email");
    this.email2 = navParams.get("email");
    this.picture = navParams.get("picture");
    console.log("In signup: "+this.picture);
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

  @Input() firstname;
  @Input() lastname;
  @Input() email;
  @Input() email2;
  @Input() role;

  sendData(){
    let id = this.id;
    let first = this.firstname;
    let last = this.lastname;
    let email = this.email;
    let role = this.role;
    let picture = this.picture;

    if(
        first == null || first.trim()=="" ||
        last == null || last.trim()=="" ||
        email == null || email.trim()=="") {
      let alert = this.alertCtrl.create({
        title: 'Signup Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    } else if( role == null) {
      let alert = this.alertCtrl.create({
        title: 'Signup Failed',
        subTitle: 'Please select you role.',
        buttons: ['OK']
      });
      alert.present();
    } else if(role == "student"){
      localStorage.setItem("role",role);
      this.navCtrl.push(UpprofilePage, {id: id, firstname: first, lastname: last, email: email, role: role, picture: picture});
    } else if(role == "company"){
      localStorage.setItem("role",role);
      this.navCtrl.push(SignupCompanyPage, {id: id, firstname: first, lastname: last, email: email, role: role, picture: picture});
    } else {
      let body = `id=${id}&first=${first}&last=${last}&email=${email}&role=${role}&picture=${picture}`;
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

                  localStorage.setItem("role",role);
                  this.navCtrl.setRoot(TabPage);

              }
          }
        )
    }
  }
}
