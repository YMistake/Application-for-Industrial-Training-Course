import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
  @Input() news;
  student: any = 0;
  teacher: any = 0;
  company: any = 0;
  items:any;
  hostname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private toastCtrl: ToastController, public http: Http) {
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

  studentStatus(item){
    if(item == true){
      this.student = 1;
    } else {
      this.student = 0;
    }
  }

  teacherStatus(item){
    if(item == true){
      this.teacher = 1;
    } else {
      this.teacher = 0;
    }
  }

  companyStatus(item){
    if(item == true){
      this.company = 1;
    } else {
      this.company = 0;
    }
  }

  sendData(){
    console.log(this.student);
    let body = `news=${this.news}&student=${this.student}&teacher=${this.teacher}&company=${this.company}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.hostname + 'news', body, {headers: headers})
      .subscribe( data => {
        var report = JSON.parse(data['_body']).report;
        if(report = 1){
          this.presentToast();
          this.news = "";
        } else {
          let alert = this.alertCtrl.create({
            title: 'Submit Failed',
            subTitle: 'Please check the server or database',
            buttons: ['OK']
          });
          alert.present();
        }
      })
  }
}
