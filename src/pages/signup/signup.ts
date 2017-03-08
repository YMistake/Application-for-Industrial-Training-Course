import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { TabPage } from '../tab/tab';
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
  id: any;
  loginPage = LoginPage;
  items:any;
  picture: any;
  hostname: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.id = navParams.get("id"); // รับ id มาจากหน้า login
    console.log("In signup: "+this.id);
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

  // @Input() username;
  // @Input() password;
  // @Input() password2;
  @Input() firstname;
  @Input() lastname;
  @Input() email;
  @Input() email2;
  @Input() role = "student";

  sendData(){
    // let user = this.username;
    // let pass = this.password;
    // let pass2 = this.password2;
    let id = this.id;
    let first = this.firstname;
    let last = this.lastname;
    let email = this.email;
    let email2 = this.email2;
    let role = this.role;
    let picture = this.picture;
    console.log(role);
    console.log(id);
    console.log("picture when press submit: "+this.picture);
    // if (user == null || user.trim()=="" ||
    //     pass == null || pass.trim()=="" ||
    //     pass2 == null || pass2.trim()=="" ||
    if(
        first == null || first.trim()=="" ||
        last == null || last.trim()=="" ||
        email == null || email.trim()=="" ||
        email2 == null || email2.trim()=="") {
      let alert = this.alertCtrl.create({
        title: 'Signup Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    // }else if (pass != pass2){
    //   let alert = this.alertCtrl.create({
    //     title: 'Signup Failed',
    //     subTitle: 'Password and confirm password does not match!',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    }else if (email != email2){
      let alert = this.alertCtrl.create({
        title: 'Signup Failed',
        subTitle: 'E-mail and confirm E-mail does not match!',
        buttons: ['OK']
      });
      alert.present();
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
                // this.navCtrl.pop();
                this.navCtrl.setRoot(TabPage, {role: role});
              }
          }
        )
    }

  }

}
