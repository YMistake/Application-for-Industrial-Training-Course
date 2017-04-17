import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the AdminSetyear page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-setyear',
  templateUrl: 'admin-setyear.html'
})
export class AdminSetyearPage {
  now: any;
  items: any;
  hostname: string;
  YearPattern = /\d/;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'setyear')
          .subscribe(data =>{
            this.now = JSON.parse(data['_body']).year;
          })
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  @Input() year;

  sendData(){
    if(this.year == null || this.year.trim()==""){
      let alert = this.alertCtrl.create({
        title: 'Submit Failed!',
        subTitle: 'Please fill New Academic Year into textbox!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `year=${this.year}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.hostname + 'setyear', body, {headers: headers})
        .subscribe( data => {
          var report = JSON.parse(data['_body']).report;
          if(report == 1){
            this.presentToast('Set Academic Year Successfull.')
            this.year = "";
          } else {
            this.presentToast('Error!! Server Problem.')
            this.year = "error! Please Check Server";
          }
        })
    }
  }

  presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSetyearPage');
  }

}
