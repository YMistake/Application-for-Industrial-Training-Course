import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { File } from 'ionic-native';
import { FileChooser } from '@ionic-native/file-chooser';



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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fileChooser: FileChooser) {}

  chooseFile(){
    this.fileChooser.open()
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadfilePage');
  }

}
