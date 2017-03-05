import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Nav } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FgpassPage } from '../fgpass/fgpass';
import { ChpassPage } from '../chpass/chpass';
import { TabPage } from '../tab/tab';


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
  @ViewChild(Nav) nav: Nav;
  items:any;
  signupPage = SignupPage;
  fgpPage = FgpassPage;
  chpPage = ChpassPage;
  img = "assets/image/KMITL.png";
  hostname: string;
  testUser = {username: undefined, password: undefined, role: "student"}; //แก้ undefined ด้วย

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

  @Input() username;
  @Input() password;
  login(){
    let user = this.username;
    let pass = this.password;
    let body = `Username=${user}&Password=${pass}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'login', body, {headers: headers})
      .subscribe(
        data => {

        }
      )

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
      this.navCtrl.setRoot(TabPage, {role: this.testUser.role});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
