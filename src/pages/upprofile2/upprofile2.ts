import { Component,Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


/*
  Generated class for the Upprofile2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upprofile2',
  templateUrl: 'upprofile2.html'
})
export class Upprofile2Page {
  // form1: FormGroup;
  items: any;
  hostname: string;
  userdata: any;
  profile: any;
  TelPattern=/0([869])([0-9]{8})/;
  @Input() AcademicYear;
  @Input() Major;
  @Input() SId;
  @Input() STel;
  @Input() SFacebook;
  @Input() SLine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));

    // this.form1 = this.formBuilder.group({
    //   // AcademicYear: ['',[Validators.minLength(4),Validators.maxLength(4), Validators.pattern('[0-9]'), Validators.required]],
    //   Major: ['',Validators.required],
    //   SId: ['', [Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]'), Validators.required]],
    //   STel: ['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]'), Validators.required]],
    //   SFacebook: ['', Validators.required],
    //   SLine: ['',Validators.required]
    // });

    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `id=${this.userdata.id}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'editprofile', body, {headers: headers})
          .subscribe(data =>{
            this.profile = JSON.parse(data['_body']).data
            this.AcademicYear = this.profile.AcademicYear;
            this.Major = this.profile.Major;
            this.SId = this.profile.SID;
            this.STel = this.profile.Tel;
            this.SFacebook = this.profile.Facebook;
            this.SLine = this.profile.Line;
          })
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }

  sendData(){
    let AY = this.AcademicYear;
    let MJ = this.Major;
    let SI = this.SId;
    let ST = this.STel;
    let SF = this.SFacebook;
    let SL = this.SLine;

    if (AY == null || AY == '' ||
        MJ == null || MJ.trim()=="" ||
        SI == null || SI.trim()=="" ||
        ST == null || ST.trim()=="" ||
        SF == null || SF.trim()=="" ||
        SL == null || SL.trim()=="" ) {
      let alert = this.alertCtrl.create({
        title: 'Edit Failed',
        subTitle: 'please fill all required fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let body = `id=${this.userdata.id}&AcademicYear=${AY}&Major=${MJ}&SID=${SI}&Tel=${ST}&Facebook=${SF}&Line=${SL}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(this.hostname + 'editprofile2', body, {headers: headers})
        .subscribe(
          data => {
            var report = JSON.parse(data['_body']).report;
            if(report == 1){
              this.presentToast('Edit profile successfull');
            } else {
              let alert = this.alertCtrl.create({
                title: 'Edit Failed',
                subTitle: 'Please check your information again',
                buttons: ['OK']
              });
              alert.present();
            }
          }
        )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upprofile2Page');
  }

}
