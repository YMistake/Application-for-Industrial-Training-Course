import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FilePath, Transfer } from 'ionic-native';
import { File } from '@ionic-native/file';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the Download page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-download',
  templateUrl: 'download.html'
})
export class DownloadPage {
  items: any;
  hostname: string;
  filelist: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public file: File) {
    this.http = http;
    this.http.get("assets/server.json")
        .subscribe(data =>{
        this.items = JSON.parse(data['_body']);//get ip from server.json
        this.hostname = this.items.ip; //put ip into hostname

        this.http.get(this.hostname + 'download_dir')
          .subscribe(data =>{
            this.filelist = JSON.parse(data['_body']);
            console.log(this.filelist);
          })
      });
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  download(file){
    console.log(file);
    const fileTransfer = new Transfer();
    var uri= encodeURI(this.hostname + 'download/' + file);
    this.loading = this.loadingCtrl.create({
      content: 'Downloading...',
    });
    this.loading.present();

    fileTransfer.download(uri, this.file.externalRootDirectory+ '/Download/' + file).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.loading.dismissAll()
        this.presentToast('File succesful downloaded.');
    }, err => {
        console.log(err);
        this.loading.dismissAll()
        this.presentToast('Error while downloading file.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DownloadPage');
  }

}
