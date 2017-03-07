import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Camera } from 'ionic-native';
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
  upprofile = UpprofilePage;
  items:any;
  id = this.navParams.get("id");
  hostname:string;
  // temp = "assets/image/DefaultProfile.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController) {
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
    message: 'Profile is updated',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

  // getPicture() {
  //   let options = {
  //     destinationType   : Camera.DestinationType.DATA_URL,
  //     sourceType        : Camera.PictureSourceType.PHOTOLIBRARY,
  //     correctOrientation: true
  //   };
  //
  //   Camera.getPicture(options).then((imageData) => {
  //    let base64Image = "data:image/jpeg;base64," + imageData;
  //    this.temp = base64Image;
  //   }, (err) => {
  // });
  //
  // }


  @Input() AcademicYear = 2559;
  @Input() Major;
  @Input() SPosition;
  @Input() STel;
  @Input() SFacebook;
  @Input() SLine;
  @Input() CName;
  @Input() CAddress;
  @Input() CTel;
  @Input() SpvName;
  @Input() SpvPosition;
  @Input() SpvTel;

  sendData(){
    let AY = this.AcademicYear;
    let MJ = this.Major;
    let SP = this.SPosition;
    let ST = this.STel;
    let SF = this.SFacebook;
    let SL = this.SLine;
    let CN = this.CName;
    let CA = this.CAddress;
    let CT = this.CTel;
    let SpvN = this.SpvName;
    let SpvP = this.SpvPosition;
    let SpvT = this.SpvTel;

    if (MJ == null || MJ.trim()=="" ||
        SP == null || SP.trim()=="" ||
        ST == null || ST.trim()=="" ||
        SF == null || SF.trim()=="" ||
        SL == null || SL.trim()=="" ||
        CN == null || CN.trim()=="" ||
        CA == null || CA.trim()=="" ||
        CT == null || CT.trim()=="" ||
        SpvN == null || SpvN.trim()=="" ||
        SpvP == null || SpvP.trim()=="" ||
        SpvT == null || SpvT.trim()=="" ) {
      let alert = this.alertCtrl.create({
        title: 'Update Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `id=${this.id}&AcademicYear=${AY}&Major=${MJ}&SPosition=${SP}&STel=${ST}&SFacebook=${SF}&SLine=${SL}&CName=${CN}&CAddress=${CA}&CTel=${CT}&SpvName=${SpvN}&SpvPosition=${SpvP}&SpvTel=${SpvT}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.hostname + 'updateprofile', body, {headers: headers})
        .subscribe(
          data => {

          }
        )
        this.presentToast();
    }
  }
}
