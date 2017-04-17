import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import { LoginPage } from '../login/login';
import {HomePage} from '../home/home';
import { SignupPage } from '../signup/signup';
import { ScnPage } from '../scn/scn';
import { Upprofile2Page } from '../upprofile2/upprofile2';
import { ReviewPage } from '../review/review';
import { DownloadPage } from '../download/download';
import { RecordPage } from '../record/record';
import { LogoutPage } from '../logout/logout';
import { TeaSpvsPage } from '../tea-spvs/tea-spvs';
import { CpnStdlistPage } from '../cpn-stdlist/cpn-stdlist';
import { AdminAnnouncePage } from '../admin-announce/admin-announce';
import { AdminApprovePage } from '../admin-approve/admin-approve';
import { AdminAssignCompanyPage } from '../admin-assign-company/admin-assign-company';
import { AdminSetyearPage } from '../admin-setyear/admin-setyear';
import { UploadfilePage } from '../uploadfile/uploadfile';

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html'
})
export class TabPage {
  @ViewChild(Nav) nav: Nav;

  chkRole: string;
  new: any;

  pages: Array<{title: string, component: any}>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chkRole = localStorage.getItem("role");
    if(this.chkRole == "student"){
    this.pages = [
        { title: 'Home Page', component: HomePage},
        { title: "Send Company's Name", component: ScnPage},
        { title: 'Edit Profile', component: Upprofile2Page},
        { title: 'Write a Review', component: ReviewPage},
        { title: 'Download', component: DownloadPage},
        { title: 'Industrial Training Record', component: RecordPage},
        { title: 'Logout', component: LogoutPage}
      ];
    }
    else if(this.chkRole == "teacher"){
      this.pages = [
        { title: "Home", component: HomePage},
        { title: "Supervision", component: TeaSpvsPage},
        { title: "Logout", component: LogoutPage}
      ];
    }
    else if(this.chkRole == "company"){
      this.pages = [
        { title: "Home", component: HomePage},
        { title: "Student List", component: CpnStdlistPage},
        { title: "Logout", component: LogoutPage}
      ];
    }
    else if(this.chkRole == "admin"){
      this.pages = [
        { title: "Home", component: HomePage},
        { title: "Approve the company", component: AdminApprovePage},
        { title: "Assign Company to Teacher", component: AdminAssignCompanyPage},
        { title: "Announcement", component: AdminAnnouncePage},
        { title: "Set Academic Year", component: AdminSetyearPage},
        { title: "Upload Documents", component: UploadfilePage },
        { title: "Logout", component: LogoutPage}
      ];
    }
    this.loadHome();
  }

  loadHome(){
    this.nav.setRoot(HomePage);
    console.log("Load Home Set root finish")
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
