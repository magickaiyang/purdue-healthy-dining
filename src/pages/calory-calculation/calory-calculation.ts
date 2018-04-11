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

  //sumCalory: any;
  //sumCaloryString: string;

  /*0:Calorie(cal), 1:Calorie from fat(cal), 2:Total fat(g), 3:Saturated fat(g), 4:Cholesterol(mg), 5:Sodium(mg), 
    6:Total Carbohydrate(g), 7:Sugar(g), 8:Dietary Fiber(g), 9:Protein(g), 10:Vitamin A(IU), 11:Vitamin C(IU),
    12:Calcium(mg), 13:Iron(mg)
  */
  sumNutritionInfo: number[];
  sumNutritionInfoString: string[];
  NutritionUnits: string[];

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
      let NutritionInfo : number[] = new Array(14);
      NutritionInfo.fill(0);
      this.showList.push({name: entry.name, count: 0, id: entry.id, NutritionInfoArray: NutritionInfo});
    }

    //this.sumCalory = 0.00;
    //this.sumCaloryString = '0.00Cal';

    this.sumNutritionInfo = new Array(14);
    this.sumNutritionInfoString = new Array(14);
    this.NutritionUnits = new Array(14);

    this.NutritionUnits[0] = 'Cal';
    this.NutritionUnits[1] = 'Cal';
    this.NutritionUnits[2] = 'g';
    this.NutritionUnits[3] = 'g';
    this.NutritionUnits[4] = 'mg';
    this.NutritionUnits[5] = 'mg';
    this.NutritionUnits[6] = 'g';
    this.NutritionUnits[7] = 'g';
    this.NutritionUnits[8] = 'g';
    this.NutritionUnits[9] = 'g';
    this.NutritionUnits[10] = 'IU';
    this.NutritionUnits[11] = 'IU';
    this.NutritionUnits[12] = 'mg';
    this.NutritionUnits[13] = 'mg';

    for (let i=0;i<this.sumNutritionInfo.length;i++){
      this.sumNutritionInfo[i] = 0;
      this.sumNutritionInfoString[i] = "0.00" + this.NutritionUnits[i];
    }


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
            data: [this.sumNutritionInfo[0], this.totalCaloryOneDay-this.sumNutritionInfo[0]]
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
       maintainAspectRatio: false,
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
    for (let i=0;i<14;i++){
      this.sumNutritionInfo[i]+=x.NutritionInfoArray[i];
      console.log(this.sumNutritionInfo[i]);
      this.sumNutritionInfoString[i] = this.sumNutritionInfo[i].toFixed(2) + this.NutritionUnits[i];
    }
    
    this.caloryPercentage = (this.sumNutritionInfo[0]/this.totalCaloryOneDay * 100).toFixed(2) + '%';
    this.createPieChart();
  }

  minus(x){
    if(x.count>0){
      x.count-=1;
      for (let i=0;i<14;i++){
        this.sumNutritionInfo[i]-=x.NutritionInfoArray[i];
        this.sumNutritionInfoString[i] = this.sumNutritionInfo[i].toFixed(2) + this.NutritionUnits[i];
      }
      this.caloryPercentage = (this.sumNutritionInfo[0]/this.totalCaloryOneDay * 100).toFixed(2) + '%';
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

      title: 'We cannot find Nutrition information for the following items:',
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
      entry.NutritionInfoArray[0] = this.savedData.Nutrition[1].Value;
      entry.NutritionInfoArray[1] = this.savedData.Nutrition[2].LabelValue*1.0;
      
      for (let i=2;i<14;i++){
        entry.NutritionInfoArray[i] = this.savedData.Nutrition[i+1].Value;
      }
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
