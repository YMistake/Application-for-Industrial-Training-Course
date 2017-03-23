import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { NewsPage } from '../news/news';


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
  Role: string;
  items:any;
  hostname:string;
  news: any;
  show = [];
  nextpage = NewsPage;
  // pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: App) {
    this.Role = localStorage.getItem("role");
    console.log(this.Role);
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        let body = `role=${this.Role}`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post(this.hostname + 'home', body, {headers: headers})
          .subscribe(data =>{
            this.news = JSON.parse(data['_body']).news;
            for (let item of this.news){
              this.show.push(item.News.slice(0,30)+"...");
            }

          })
        },error=>{
            console.log(error);// Error getting the data
        } );
  }

  sendData(i,item){
    this.navCtrl.push(NewsPage, this.news[i]);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
