import { Component, Input } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { File, FilePath, Transfer } from 'ionic-native';
import { FileChooser } from '@ionic-native/file-chooser';
import { Http, Headers } from '@angular/http';


/*
  Generated class for the Uploadfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-uploadfile',
  templateUrl: 'uploadfile.html'
})

export class UploadfilePage {
  items: any;
  hostname: string;
  uri: any;
  loading: any;
  @Input() filename;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fileChooser: FileChooser, public http: Http, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
        this.http = http;
        this.http.get("assets/server.json")
            .subscribe(data =>{
            this.items = JSON.parse(data['_body']);//get ip from server.json
            this.hostname = this.items.ip; //put ip into hostname
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


  chooseFile(){
    this.fileChooser.open()
      .then(uri => {
        this.uri = uri;
        console.log(this.uri)
      })
      .catch(e => console.log(e));
  }


  upload(){
            const fileTransfer = new Transfer();

            var options = {
                fileKey: "file",
                fileName: this.filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'fileName': this.filename}
            };

            this.loading = this.loadingCtrl.create({
              content: 'Uploading...',
            });
            this.loading.present();

            fileTransfer.upload(this.uri, this.hostname + 'upload', options).then(data => {
                this.loading.dismissAll()
                this.presentToast('File succesful uploaded.');
            }, err => {
                this.loading.dismissAll()
                this.presentToast('Error while uploading file.');
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadfilePage');
  }

}
