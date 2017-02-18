import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
/*
  Generated class for the AdminAnnounce page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-announce',
  templateUrl: 'admin-announce.html'
})
export class AdminAnnouncePage {
  items:any;
  hostname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http) {
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
    console.log('ionViewDidLoad AdminAnnouncePage');
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Successfull',
    duration: 3000,
    position: 'bottom'
    });
    toast.present();
  }

  @Input() announce;
  @Input() student = "true";
  @Input() teacher;
  @Input() company;

  sendData(){
    let announce = this.announce;
    let student = this.student;
    let teacher = this.teacher;
    let company = this.company;
    let body = `announce=${announce}&student=${student}&teacher=${teacher}&company=${company}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

  }
}
