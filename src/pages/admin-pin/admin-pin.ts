import { Component,Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TabPage } from '../tab/tab';

/*
  Generated class for the AdminPin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-pin',
  templateUrl: 'admin-pin.html'
})
export class AdminPinPage {
  hostname: string;
  items: any;

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
  @Input() pin;
  login(){
    let pin = this.pin;
    let body = `pin=${pin}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'admin-login', body, {headers: headers})
      .subscribe( data => {
        var report = JSON.parse(data['_body']).report;
        if ( report == 1){
          this.navCtrl.setRoot(TabPage, {role: "admin"});
        } else {
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: 'You entered an incorrect pin',
            buttons: ['OK']
          });
          alert.present();
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPinPage');
    localStorage.setItem("role","admin");
  }

}
