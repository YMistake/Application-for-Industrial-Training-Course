import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { TabPage } from '../tab/tab';
/*
  Generated class for the Upprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upprofile',
  templateUrl: 'upprofile.html'
})
export class UpprofilePage {
  tab = TabPage;
  items:any;
  signupdata: any;
  userdata: any;
  hostname:string;
  TelPattern=/([08]|[09]|[06])([0-9]{8})/;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController) {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    this.signupdata = navParams.data;
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
    console.log('ionViewDidLoad UpprofilePage');
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Create profile successfull',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

  @Input() AcademicYear;
  @Input() Major;
  @Input() SId;
  @Input() STel;
  @Input() SFacebook;
  @Input() SLine;

  sendData(){
    let AY = this.AcademicYear;
    let MJ = this.Major;
    let SI = this.SId;
    let ST = this.STel;
    let SF = this.SFacebook;
    let SL = this.SLine;

    if (AY == null || AY.trim()=="" ||
        MJ == null || MJ.trim()=="" ||
        SI == null || SI.trim()=="" ||
        ST == null || ST.trim()=="" ||
        SF == null || SF.trim()=="" ||
        SL == null || SL.trim()=="" ) {
      let alert = this.alertCtrl.create({
        title: 'Update Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `id=${this.userdata.id}&AcademicYear=${AY}&Major=${MJ}&SID=${SI}&Tel=${ST}&Facebook=${SF}&Line=${SL}&firstname=${this.signupdata.firstname}&lastname=${this.signupdata.lastname}&email=${this.signupdata.email}&role=${this.signupdata.role}&picture=${this.signupdata.picture}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.hostname + 'updateprofile', body, {headers: headers})
        .subscribe(
          data => {
            var report = JSON.parse(data['_body']).report;
            if(report == 1){
              this.navCtrl.push(TabPage);
            }
          }
        )
        this.presentToast();
    }
  }
}
