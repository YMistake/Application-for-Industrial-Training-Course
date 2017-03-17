import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the TeaUpprofile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tea-upprofile',
  templateUrl: 'tea-upprofile.html'
})
export class TeaUpprofilePage {
  items: any;
  hostname: string;
  userdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public toastCtrl: ToastController) {
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

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Profile is updated',
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}



  @Input() firstname;
  @Input() lastname;
  @Input() Tel;

  sendData(){
    if( this.firstname == null || this.firstname.trim() == "" ||
        this.lastname == null || this.lastname.trim() == "" ||
        this.Tel == null || this.Tel.trim() == ""){
          let alert = this.alertCtrl.create({
            title: 'Update Failed',
            subTitle: 'please fill all required fields!',
            buttons: ['OK']
          });
          alert.present();
        } else {
          let body = `id=${this.userdata.id}&firstname=${this.firstname}&lastname=${this.lastname}&tel=${this.Tel}`;
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          this.http.post(this.hostname + 'teacher-updateprofile', body, {headers: headers})
            .subscribe(
              data => {

              }
            )
          this.presentToast();
          this.firstname = "";
          this.lastname = "";
          this.Tel = "";
        }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeaUpprofilePage');
  }

}
