import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CaloryCalculationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calory-calculation',
  templateUrl: 'calory-calculation.html',
})


export class CaloryCalculationPage {

  itemSelected: any;
  showList : any;
  savedData: any;
  sumCalory: any;
  sumCaloryString: string;
  noInfo: any;
  hasBadInfo: boolean;

  constructor(private navParams: NavParams, private http: HttpClient, private alertCtrl: AlertController) {

    this.itemSelected = this.navParams.get('title');
    this.showList = [];
    this.noInfo = [];
    for (let entry of this.itemSelected){
      this.showList.push({name: entry.name, count: 0.00, calory: 0.00, id: entry.id});
    }
    this.sumCalory = 0.00;
    this.sumCaloryString = '0.00Cal';
    this.hasBadInfo = false;

  }


  add(x){
    x.count+=1;
    this.sumCalory+=x.calory;
    this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
  }

  minus(x){
    if(x.count>0){
      x.count-=1;
      this.sumCalory-=x.calory;
      this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
    }
  }

  showAlert() {
    let string1: string = "";

    let count = 1;

    for (let i of this.noInfo){
      string1 += count + '. ';
      string1 += i;
      string1 += '<br/>';
      count++;
    }
    let alert = this.alertCtrl.create({

      title: 'We cannot find Calory information for the following items:',
      subTitle: string1,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillEnter(){
    this.loadXML();

  }
  ionViewDidEnter(){
    if (this.hasBadInfo){
      this.showAlert();
    }
  }



  loadXML() {

    for (let entry of this.showList){
      let url = 'https://api.hfs.purdue.edu/menus/v2/items/';
      url += entry.id;

      //console.log(url);

      this.http.get(url)
        .subscribe((data) => {
            this.parseXML(data, entry)
          }
        );

    }
  }

  parseXML(data, entry) {

    this.savedData = data;  //save data to process after a meal time has been selected

    //console.log(this.savedData);
    try{
      entry.calory = this.savedData.Nutrition[1].Value;
      //console.log(this.showList);
    }
    catch(e){
      this.noInfo.push(entry.name);
      const index: number = this.showList.indexOf(entry);
      if (index !== -1) {
        this.showList.splice(index, 1);
      }
      this.hasBadInfo = true;
      console.log(this.hasBadInfo);
      //console.log(this.showList);
      //console.log(this.noInfo);
    }
    //console.log(this.sumCalory);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaloryCalculationPage');

  }

}
