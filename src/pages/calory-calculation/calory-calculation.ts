import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the CaloryCalculationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calory-calculation',
  templateUrl: 'calory-calculation.html',
})


export class CaloryCalculationPage {

    itemSelected: any;
    showList : any;
    savedData: any;
    sumCalory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

  	this.itemSelected = this.navParams.get('title');
  	this.showList = [];
  	for (let entry of this.itemSelected){
  		this.showList.push(entry.name);
  	}
    this.sumCalory = 0;
  	
  }


  caloryCalculation(){
    this.loadXML();

  }

  ionViewWillEnter(){
    this.caloryCalculation();
  }

  

  loadXML() {
    
    for (let entry of this.itemSelected){
      let url = 'https://api.hfs.purdue.edu/menus/v2/items/';
      url += entry.id;
    
      console.log(url);
    //console.log(url);

      this.http.get(url)
        .subscribe((data) => {
            this.parseXML(data)
          }
        );

    }
  }

  parseXML(data) {
    
      this.savedData = data;  //save data to process after a meal time has been selected

      var i, calory;
      console.log(this.savedData);
      calory = this.savedData.Nutrition[1].Value;

      this.sumCalory+= calory;
      console.log(this.sumCalory);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaloryCalculationPage');
    
  }

}
