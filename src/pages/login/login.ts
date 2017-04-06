import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AdminPinPage } from '../admin-pin/admin-pin';
import { TabPage } from '../tab/tab';
import 'rxjs/add/operator/map';

declare var window: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  is_login = false;
  adminpage = AdminPinPage;
  user = [];
  userid: any;
  role: string;
  picture: any;
  @Input() Role = "user";
  @ViewChild(Nav) nav: Nav;
  items:any; // ใช้เก็บ Json
  img = "assets/image/KMITL.png";
  hostname: string; // เก็บ ip server

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  checkLogin(){
    if (this.Role == "user"){
      this.login();
    } else if (this.Role == "admin") {
      this.navCtrl.push(AdminPinPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Warning!!!',
        subTitle: 'Please select your role.',
        buttons: ['OK']
      });
      alert.present();
    }
  }



  googleLogin() {
      return new Promise(function (resolve, reject) {
          var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=169572415037-ik488epur22ehatr1dt6nlk5r032g3gq.apps.googleusercontent.com&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
          ref.addEventListener('loadstart', (event) => {
            console.log("Done");
              if ((event.url).startsWith("http://localhost/callback")) {
                  ref.removeEventListener("exit", (event) => { });
                  ref.close();
                  var requestToken = (event.url).split("code=")[1];
                  resolve(requestToken);
              }
          });
          ref.addEventListener("exit", function (event) {
              reject("The google sign in flow was canceled");
          });
      })
  }

  login() {
      this.googleLogin().then((data) => {

          let creds = 'client_id=169572415037-ik488epur22ehatr1dt6nlk5r032g3gq.apps.googleusercontent.com'
  +'&client_secret=-Sir1weG-4gy_RHdaJYlhkaI'
  +'&redirect_uri=http://localhost/callback'
  +'&grant_type=authorization_code'
  +'&code=' + data;
  console.log(data)
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          console.log(data)


          this.http.post('https://accounts.google.com/o/oauth2/token',creds,{headers: headers}).map(res => res.json()).subscribe(data => {
              console.log(data)

              this.http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+data.access_token).map(res => res.json()).subscribe(result => {
                  console.log(result)
                  localStorage.setItem("userdata",JSON.stringify(result));
                  console.log(JSON.parse(localStorage.getItem("userdata")));
                  this.user=result;
                  this.userid = result.id;
                  this.picture = result.picture;
                  console.log("In login: "+this.picture);
                  console.log("In login: "+this.userid);
                  this.is_login=true;

                  let body = `id=${this.userid}&picture=${this.picture}`;
                  let headers = new Headers();
                  headers.append('Content-Type', 'application/x-www-form-urlencoded');
                  this.http.post(this.hostname + 'login', body, {headers: headers})
                    .subscribe(
                      data => {
                        var report = JSON.parse(data['_body']).report;
                        this.role = JSON.parse(data['_body']).Role;
                        localStorage.setItem("role",this.role);
                        console.log("Report = " + report);
                        if (report == 1){
                          this.navCtrl.push(SignupPage, {id: result.id, firstname: result.given_name, lastname: result.family_name, email: result.email, picture: result.picture}); // เรียกหน้า signup พร้อมส่ง id ให้ไปด้วย
                        } else {
                          this.navCtrl.setRoot(TabPage);
                        }
                      }
                    )

              })
          },(error)=>{
              console.log('error in', error);
          })
      }, (error) => {
          console.log('error', error);
      })

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter LoginPage');
  }

}
