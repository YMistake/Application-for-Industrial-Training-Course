import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the StudentInfor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-infor',
  templateUrl: 'student-infor.html'
})
export class StudentInforPage {
  studentName: string;
  company: string;
  position: string;
  telephone: number;
  facebook: string;
  line: string;
  review1: string;
  review2: string;
  review3: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.studentName=navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

}
