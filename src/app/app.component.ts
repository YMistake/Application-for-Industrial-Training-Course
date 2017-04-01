import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp, ToastController, App } from 'ionic-angular';
import { StatusBar,Splashscreen } from 'ionic-native';

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
  lastBack: any;
  allowClose: any;


  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public ionicApp: IonicApp, public toastCtrl: ToastController, public app: App) {
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
      Splashscreen.hide();

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("0ed8eb32-4000-4f4b-9217-3475c32fcbb5", "AAAAtYg4Lck:APA91bEcFYTft_a5DyMJj6YCDEXSbRwapaQ730Fr0o4NWxGYYKygh2vX4uXdjcFrgapxm8-4rM5RbnPfHJTgnkoXZjDA-x_ZzVgAzPiQtgCIFGkJQ7UHf7xZv5F78WKyojJ5ob_RvGUh")
      	.handleNotificationOpened(notificationOpenedCallback)
        .endInit();
        });

        this.platform.registerBackButtonAction(() => {
      	const overlay = this.app._appRoot._overlayPortal.getActive();
      	const nav = this.app.getActiveNav();
      	const closeDelay = 2000;
      	const spamDelay = 500;

      	if(overlay && overlay.dismiss) {
      		overlay.dismiss();
      	} else if(nav.canGoBack()){
      		nav.pop();
      	} else if(Date.now() - this.lastBack > spamDelay && !this.allowClose) {
      		this.allowClose = true;
      		let toast = this.toastCtrl.create({
      			message: "Press back again to exit.",
      			duration: closeDelay,
      			dismissOnPageChange: true
      		});
      		toast.onDidDismiss(() => {
      			this.allowClose = false;
      		});
      		toast.present();
      	} else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
      		this.platform.exitApp();
      	}
      	this.lastBack = Date.now();
      });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
