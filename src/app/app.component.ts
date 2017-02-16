import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ScnPage } from '../pages/scn/scn';
import { UpprofilePage } from '../pages/upprofile/upprofile';
import { ReviewPage } from '../pages/review/review';
import { DownloadPage } from '../pages/download/download';
import { RecordPage } from '../pages/record/record';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home Page', component: HomePage},
    //   { title: "Send Company's Name", component: ScnPage},
    //   { title: 'Update Profile', component: UpprofilePage},
    //   { title: 'Write a Review', component: ReviewPage},
    //   { title: 'Download', component: DownloadPage},
    //   { title: 'Industrial Training Record', component: RecordPage},
    //   { title: 'Logout', component: LoginPage}
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.show();
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
