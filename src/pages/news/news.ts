import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the News page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  news: any;
  day: any;
  time: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.news = navParams.data;
    this.day = this.news.PostDay.slice(0,10);
    this.time = this.news.PostDay.slice(11,16);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
