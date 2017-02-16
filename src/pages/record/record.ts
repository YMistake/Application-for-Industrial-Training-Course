import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AcademicPage } from '../academic/academic';

/*
  Generated class for the Record page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {

  academic = AcademicPage;
  items=["2559","2558"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
  }

}
