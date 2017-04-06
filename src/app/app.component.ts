import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicApp, ToastController, App } from 'ionic-angular';
import { StatusBar,Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  lastBack: any;
  allowClose: any;

  constructor(public platform: Platform, public ionicApp: IonicApp, public toastCtrl: ToastController, public app: App) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.show();

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
}
