import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

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


export class CaloryCalculationPage{

  itemSelected: any;
  showList : any;
  savedData: any;
  sumCalory: any;
  sumCaloryString: string;
  noInfo: any;
  hasBadInfo: boolean;
  totalCaloryOneDay: number; 
  totalCaloryOneDayString: string;
  caloryPercentage: string;

  //pie: any;
  //pieChart: any

  constructor(private navParams: NavParams, private http: HttpClient, private alertCtrl: AlertController, public global: GlobalProvider) {

    this.itemSelected = this.navParams.get('title');
    this.showList = [];
    this.noInfo = [];
    for (let entry of this.itemSelected){
      this.showList.push({name: entry.name, count: 0.00, calory: 0.00, id: entry.id});
    }
    this.sumCalory = 0.00;
    this.sumCaloryString = '0.00Cal';
    this.hasBadInfo = false;
    this.calculateCaloryOneDay();
    this.caloryPercentage = "0.00%";
    
  }

  createPieChart() {
       //PIE CHART
     var pie = document.getElementById("pieChart");
     var pieChart = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Calories intake for this meal", "Calories you still can intake today"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#9ef315","#15f3d9"],
            data: [this.sumCalory, this.totalCaloryOneDay-this.sumCalory]
          }
        ]
      },
      options: {
        //legend: { display: true },

        title: {
          display: true,
          text: 'Calory Pie Chart'
        },
       responsive: true,
      }
     });
  }

  calculateCaloryOneDay(){
    if (this.global.userGender === "Male"){
      this.totalCaloryOneDay = (10*this.global.userWeight+6.25*this.global.userHeight-5*this.global.userAge-5)*1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else if(this.global.userGender === "Female"){
      this.totalCaloryOneDay = (10*this.global.userWeight+6.25*this.global.userHeight-5*this.global.userAge-161)*1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else{
      console.log(this.global.userGender);
    }
  }


  add(x){
    x.count+=1;
    this.sumCalory+=x.calory;
    this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
    this.caloryPercentage = (this.sumCalory/this.totalCaloryOneDay * 100).toFixed(2) + '%';
    this.createPieChart();
  }

  minus(x){
    if(x.count>0){
      x.count-=1;
      this.sumCalory-=x.calory;
      this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
      this.caloryPercentage = (this.sumCalory/this.totalCaloryOneDay * 100).toFixed(2) + '%';
      this.createPieChart();
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

    this.createPieChart();
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
