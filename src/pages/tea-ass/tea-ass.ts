import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
/*
  Generated class for the TeaAss page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tea-ass',
  templateUrl: 'tea-ass.html'
})
export class TeaAssPage {
  SData: any;
  items:any;
  hostname:string;
  userdata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.SData = navParams.data;
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaAssPage');
  }

  @Input() _1 = "n/a";
  @Input() _2 = "n/a";
  @Input() _3 = "n/a";
  @Input() _4 = "n/a";
  @Input() _5 = "n/a";
  @Input() _6 = "n/a";
  @Input() _7 = "n/a";
  @Input() _8 = "n/a";
  @Input() _9 = "n/a";
  @Input() _10 = "n/a";
  @Input() _11 = "n/a";
  @Input() _12 = "n/a";
  @Input() _13 = "n/a";
  @Input() _14 = "n/a";
  @Input() _15 = "n/a";
  @Input() _16 = "n/a";
  @Input() _17 = "n/a";
  @Input() _18 = "n/a";
  @Input() _19 = "n/a";
  @Input() _20 = "n/a";
  @Input() Opinion;

  sendData(){
    let _1 = this._1;
    let _2 = this._2;
    let _3 = this._3;
    let _4 = this._4;
    let _5 = this._5;
    let _6 = this._6;
    let _7 = this._7;
    let _8 = this._8;
    let _9 = this._9;
    let _10 = this._10;
    let _11 = this._11;
    let _12 = this._12;
    let _13 = this._13;
    let _14 = this._14;
    let _15 = this._15;
    let _16 = this._16;
    let _17 = this._17;
    let _18 = this._18;
    let _19 = this._19;
    let _20 = this._20;
    let list = [_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_20];
    let Opinion = this.Opinion;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if (Opinion == null || Opinion.trim() == "" || Opinion == undefined){
      Opinion = "No Opinion";
      console.log(Opinion);
      console.log("Do OP")
    }
    let body = `id=${this.SData.ID}&Assesser=${this.userdata.id}&_1=${_1}&_2=${_2}&_3=${_3}&_4=${_4}&_5=${_5}&_6=${_6}&_7=${_7}&_8=${_8}&_9=${_9}&_10=${_10}&_11=${_11}&_12=${_12}&_13=${_13}&_14=${_14}&_15=${_15}&_16=${_16}&_17=${_17}&_18=${_18}&_19=${_19}&_20=${_20}&Opinion=${Opinion}`;
    let check = true;
    for (let item of list){
      if (item == "n/a"){
        check = false;
        let alert = this.alertCtrl.create({
          title: 'Submit Failed',
          subTitle: 'please check the score again!',
          buttons: ['OK']
        });
        alert.present();
        break;
      }
    }
  if (check){
      this.http.post(this.hostname + 'teacher_supervision/company/Assesment',body,{headers: headers})
        .subscribe(data =>{
          var report = JSON.parse(data['_body']).report;
          if(report == 1){
            let alert = this.alertCtrl.create({
              title: 'Assesment Successfull',
              subTitle: 'Thank you for your kind cooperation.',
              buttons: [{text: 'OK', handler: () => { this.navCtrl.pop();}}]
            });
            alert.present();
          } else if (report == 0) {
            let alert = this.alertCtrl.create({
              title: 'Something Wrong',
              subTitle: 'Please contact administrator.',
              buttons: [{text: 'OK', handler: () => { this.navCtrl.pop();}}]
            });
            alert.present();
          }
        });
    }
  }

}
