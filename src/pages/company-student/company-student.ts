import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StudentInforPage } from '../student-infor/student-infor';
/*
  Generated class for the CompanyStudent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-company-student',
  templateUrl: 'company-student.html'
})
export class CompanyStudentPage {
  companyName: string;
  si = StudentInforPage;
  data = [{
    name: "ice",
    rec: "recommend"
  },{
    name: "nu",
    rec: "non recommend"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.companyName=navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

}
