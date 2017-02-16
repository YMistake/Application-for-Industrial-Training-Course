import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CompanyStudentPage } from '../company-student/company-student';

/*
  Generated class for the Academic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-academic',
  templateUrl: 'academic.html'
})
export class AcademicPage {

  year: string;
  items=["P&P","KMITL"];
  cs = CompanyStudentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.year=navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

}
