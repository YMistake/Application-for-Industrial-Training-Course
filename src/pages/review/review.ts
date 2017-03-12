import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the Review page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {
  items:any;
  userdata:any;
  hostname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http,public alertCtrl: AlertController) {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    this.http = http;
    this.http.get("assets/server.json")
      .subscribe(data =>{
      this.items = JSON.parse(data['_body']);//get ip from server.json
      this.hostname = this.items.ip; //put ip into hostname
      },error=>{
          console.log(error);// Error getting the data
      } );

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ReviewPage');
    console.log("Id From ReviewPage : "+this.userdata.id);
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Successfull',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }

  @Input() Recommend = "recommend";
  @Input() Work_Environment;
  @Input() Travel;
  @Input() Bistro;
  sendData(){
    let rec = this.Recommend;
    let Work_Environment = this.Work_Environment;
    let Travel = this.Travel;
    let Bistro = this.Bistro;

    if (Work_Environment == null || Work_Environment.trim()=="" ||
        Travel == null || Travel.trim()=="" ||
        Bistro == null || Bistro.trim()=="") {
      let alert = this.alertCtrl.create({
        title: 'Submit Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `id=${this.userdata.id}&rec=${rec}&Work_Environment=${Work_Environment}&Travel=${Travel}&Bistro=${Bistro}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.hostname + 'review', body, {headers: headers})
        .subscribe(
          data => {

          }
        )
      this.presentToast();
      this.Work_Environment = "";
      this.Travel = "";
      this.Bistro = "";
    }

  }
}
