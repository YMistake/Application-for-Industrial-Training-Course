import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
    console.log('ionViewDidLoad ReviewPage');
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
  @Input() Climate;
  @Input() Travel;
  @Input() Eating;
  sendData(){
    let rec = this.Recommend;
    let climate = this.Climate;
    let travel = this.Travel;
    let eat = this.Eating;
    let body = `rec=${rec}&climate=${climate}&travel=${travel}&eat=${eat}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

  }
}
