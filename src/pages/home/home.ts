import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { ScnPage } from '../scn/scn';
import { UpprofilePage } from '../upprofile/upprofile';
import { ReviewPage } from '../review/review';
import { DownloadPage } from '../download/download';
import { RecordPage } from '../record/record';


/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
  signupPage = SignupPage;
  Role: string;

  pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.Role = navParams.get('chkRole');
    console.log(this.Role);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
