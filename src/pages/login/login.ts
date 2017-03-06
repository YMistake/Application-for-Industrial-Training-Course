import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FgpassPage } from '../fgpass/fgpass';
import { ChpassPage } from '../chpass/chpass';
import { TabPage } from '../tab/tab';
import 'rxjs/add/operator/map';

declare var window: any;

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  is_login = false;
  user = [];
  id: any;
  firstname: string;
  lastname: string;
  email: string;


  @ViewChild(Nav) nav: Nav;
  items:any; // ใช้เก็บ Json
  // signupPage = SignupPage; // เก็บหน้าลิงค์
  // fgpPage = FgpassPage;  // เก็บหน้าลิงค์
  // chpPage = ChpassPage;  // เก็บหน้าลิงค์
  img = "assets/image/KMITL.png";
  hostname: string; // เก็บ ip server
  // testUser = {username: undefined, password: undefined, role: "student"}; // ใช้ทดสอบ login

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
                  this.user=result;
                  this.id = result.id;
                  this.firstname = result.given_name;
                  this.lastname = result.family_name;
                  this.email = result.email;
                  // this.is_login=true;
                  console.log(this.id);
                  
                  let body = `id=${this.id}`;
                  let headers = new Headers();
                  headers.append('Content-Type', 'application/x-www-form-urlencoded');
                  this.http.post(this.hostname + 'login', body, {headers: headers})
                    .subscribe(
                      data => {
                        var report = JSON.parse(data['_body']).report;
                        if (report == 1){
                          this.navCtrl.push(SignupPage, {id: this.id, firstname: this.firstname, lastname: this.lastname, email: this.email}); // เรียกหน้า signup พร้อมส่ง id ให้ไปด้วย
                        } else {
                          // TODO เพิ่มการรับ Role มาจาก Backend เพื่อใช้เช็คบรรทัดด้านล่าง
                          this.navCtrl.setRoot(TabPage, {role: this.firstname}); // ใส่ firstname ไว้ไม่ให้ error เฉยๆ
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

  logout(){
      this.is_login = false;
      this.user = [];
  }



  // @Input() username;
  // @Input() password;
  // login(){
  //   let username = this.username;
  //   let password = this.password;
  //   let body = `Username=${username}&Password=${password}`;
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post(this.hostname + 'login', body, {headers: headers})
  //     .subscribe(
  //       data => {
  //         var report = JSON.parse(data['_body']).report;
  //         if (report == 0){
  //           let alert = this.alertCtrl.create({
  //             title: 'Login Failed',
  //             subTitle: 'Usename Not Found!',
  //             buttons: ['OK']
  //           });
  //           alert.present();
  //         } else if (report == 1){
  //           let alert = this.alertCtrl.create({
  //             title: 'Login Failed',
  //             subTitle: 'Wrong Password!',
  //             buttons: ['OK']
  //           });
  //           alert.present();
  //         } else {
  //           this.navCtrl.setRoot(TabPage, {role: this.testUser.role});
  //         }
  //       }
  //     )

    // if(user == this.testUser.username && pass == this.testUser.password){ //แก้ในวงเล็บให้เช็คการตอบกลับจาก backend ถ้า true ให้เข้าได้ ถ้า false ให้ไปทำตรง else
    //   console.log("login successfull");
    //   this.navCtrl.setRoot(TabPage, {role: this.testUser.role});
    // }
    // else {
    //   let wrongpass = this.alertCtrl.create({
    //     subTitle: "Username or Password incorrect.",
    //     buttons: ['OK']
    //   })
    //   wrongpass.present();
    // }

  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
