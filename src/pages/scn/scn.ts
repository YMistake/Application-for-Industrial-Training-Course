import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, ToastController, Platform, LoadingController  } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Http, Headers, ResponseContentType } from '@angular/http';
/*
  Generated class for the Scn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scn',
  templateUrl: 'scn.html'
})
export class ScnPage {
  items:any;
  userdata: any;
  hostname:string;
  show: boolean = true;
  list=[];
  loading: any;
  errorMessage: string;
  status: any;
  status_text: any;
  temp= "assets/image/Default.png";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
    public http: Http, private toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
      this.userdata = JSON.parse(localStorage.getItem("userdata"));
      this.http = http;
      this.http.get("assets/server.json")
          .subscribe(data =>{
          this.items = JSON.parse(data['_body']);//get ip from server.json
          this.hostname = this.items.ip; //put ip into hostname

          let body = `id=${this.userdata.id}`;
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          this.http.post(this.hostname + 'sent-company-check',body,{headers: headers})
            .subscribe(data => {
              this.status = JSON.parse(data['_body']).data;
              console.log(this.status);
              if (this.status == 1){
                this.status_text = "รอการอนุมัติ";
              } else if (this.status == 2){
                this.status_text = "อนุมัติแล้ว";
              } else if (this.status == 3) {
                this.status_text = "ไม่อนุมัติ ส่งชื่อบริษัทใหม่";
              } else {
                this.status_text = "ยังไม่ส่งชื่อบริษัท";
              }
            })
          },error=>{
              console.log(error);// Error getting the data
          } );
  }

  presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
  }

  @Input() CompanyName;
  @Input() CompanyAddress;
  @Input() CompanyTel;
  sendData(){
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    let list = this.list;
    if( list == null || list.length == 0 ||
        this.CompanyName == null || this.CompanyName.trim()=="" ||
        this.CompanyAddress == null || this.CompanyAddress.trim()=="" ||
        this.CompanyTel == null || this.CompanyTel.trim()==""){
          let alert = this.alertCtrl.create({
            title: 'Submit Failed',
            subTitle: 'please fill all required fields!',
            buttons: ['OK']
          });
          alert.present();
        } else {
          let body = `id=${this.userdata.id}&CompanyName=${this.CompanyName}&CompanyAddress=${this.CompanyAddress}&CompanyTels=${this.CompanyTel}&img=${this.temp}`;
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          for (let list of this.list){
            body += `&list[]=${list.id}`;
          }
          this.http.post(this.hostname + 'sent-company', body, {headers: headers})
            .subscribe(
              data => {
                console.log(data['_body'])
                var report = JSON.parse(data['_body']).report;
                console.log(report);
                if ( report = 1){
                  this.loading.dismissAll();
                  this.presentToast('Successfull');
                }
              },
              error =>  {
                this.loading.dismissAll()
                this.errorMessage = <any>error
                this.presentToast('Error while uploading file.');
              }
            )
            this.CompanyName = "";
            this.CompanyAddress = "";
            this.CompanyTel = "";
            this.list=[];
            this.updateValue();
            this.temp = "assets/image/Default.png";
        }
  }

 updateValue(){
   if(this.list.length==0){
     this.show=true
   }
   else{
     this.show=false
   }
 }


 showPrompt() {
   let prompt = this.alertCtrl.create({
     message: "Enter Student's ID that want to go to this company",
     inputs: [
       {
         name: 'id',
         placeholder: "Student ID",
         type: 'tel'
       }
     ],
     buttons: [
       {
         text: 'Cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Save',
         handler: data => {
           console.log('Saved clicked');
           if(data.id.trim() != ""){
             this.list.push({id: data.id});
             this.updateValue();
         }
           console.log(this.list);
         }
       }
     ]
   });
   prompt.present();
 }

 getPicture() {
   let options = {
     destinationType   : Camera.DestinationType.DATA_URL,
     sourceType        : Camera.PictureSourceType.PHOTOLIBRARY,
     correctOrientation: true
   };

   Camera.getPicture(options).then((imageData) => {
    let base64Image = "data:image/jpeg;base64," + imageData;
    this.temp = base64Image;
   }, (err) => {
 });
 }


  presentActionSheet(i) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Option',
      buttons: [
        {
          text: 'Edit',
          handler: data => {
            this.edit(i);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let remove = this.alertCtrl.create({
              title: 'Delete your list?',
              message: 'Do you want to delete your list?',
              buttons: [
                {
                  text: 'No',
                  handler: () => {
                    console.log('No clicked');
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    this.list.splice(i,1);
                    this.updateValue();
                  }
                }
              ]
            })
            remove.present();
          }
        },
        {
          text: 'Clear',
          handler: () => {
            let clear = this.alertCtrl.create({
              title: 'Clear your list?',
              message: 'Do you want to clear your list?',
              buttons: [
                {
                  text: 'No',
                  handler: () => {
                    console.log('No clicked');
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    this.list = [];
                    this.updateValue();
                  }
                }
              ]
            })
            clear.present();
          }
        }
      ]
    });
    actionSheet.present();
  }

  edit(i){
    let prompt = this.alertCtrl.create({
      message: "Edit your informations",
      inputs: [
        {
          name: 'id',
          value: this.list[i].id,
          placeholder: "Student ID",
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Edit',
          handler: data => {
            console.log('Saved clicked');
            if(data.id.trim() != ""){
              this.list[i] = {id: data.id};
              this.updateValue();
          }
            console.log(this.list);
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScnPage');
    this.updateValue();
  }

}
