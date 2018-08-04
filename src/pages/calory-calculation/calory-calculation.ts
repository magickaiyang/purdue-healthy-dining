import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AlertController} from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import {Chart} from 'chart.js';

@Component({
  selector: 'page-calory-calculation',
  templateUrl: 'calory-calculation.html',
})

export class CaloryCalculationPage {

  itemSelected: any;
  showList: any;
  savedData: any;

  sumCalory: any;
  sumCaloryString: string;
  totalCaloryOneDay: number;
  totalCaloryOneDayString: string;
  caloryPercentage: string;

  sumCarbohydrates: any;
  sumCarbohydratesString: string;
  totalCarbohydratesOneDay:number;
  totalCarbohydratesOneDayString:string;
  carbohydratesPercentage:string;

  sumProtein: any;
  sumProteinString: string;
  totalProteinOneDay:number;
  totalProteinOneDayString:string;
  proteinPercentage:string;

  sumFiber:any;
  sumFiberString:string;
  totalFiberOneDay:number;
  totalFiberOneDayString:string;
  fiberPercentage:string;

  noInfo: any;
  hasBadInfo: boolean;

  constructor(private navParams: NavParams, private http: HttpClient, private alertCtrl: AlertController, public global: GlobalProvider) {

    this.itemSelected = this.navParams.get('title');
    this.showList = [];
    this.noInfo = [];
    for (let entry of this.itemSelected) {
      this.showList.push({name: entry.name, count: 0.00, calory: 0.00, carbohydrates:0.00, protein:0.00, fiber:0.00, id: entry.id});
    }
    this.hasBadInfo = false;

    this.sumCalory = 0.00;
    this.sumCaloryString = '0.00Cal';
    this.calculateCaloryOneDay();
    this.caloryPercentage = "0.00%";

    this.sumCarbohydrates=0.00;
    this.sumCarbohydratesString='0.00g';
    this.calculateCarbohydratesOneDay();
    this.carbohydratesPercentage='0.00%';

    this.sumProtein=0.00;
    this.sumProteinString='0.00g';
    this.calculateProteinOneDay();
    this.proteinPercentage='0.00%';

    this.sumFiber=0.00;
    this.sumFiberString='0.00g';
    this.calculateFiberOneDay();
    this.fiberPercentage='0.00%';
  }

  createPieChart() {
    let pie = document.getElementById("pieChart");
    let pieChart = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Calories intake for this meal", "Calories you still can intake today"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#6f8e26", "#8e7127", "#4286f4"],//CHANGED
            data: [this.sumCalory, this.totalCaloryOneDay - this.sumCalory]
          }
        ]
      },
      options: {
        //legend: { display: true },

        title: {
          display: true,
          text: 'Calorie Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  createPieChart2() {
    let pie = document.getElementById("pieChart2");
    let pieChart2 = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Carbohydrates intake for this meal", "Carbohydrates you still can intake today"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#6f8e26", "#8e7127", "#4286f4"],//CHANGED
            data: [this.sumCarbohydrates, this.totalCarbohydratesOneDay - this.sumCarbohydrates]
          }
        ]
      },
      options: {
        //legend: { display: true },

        title: {
          display: true,
          text: 'Carbohydrate Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  createPieChart3() {
    let pie = document.getElementById("pieChart3");
    let pieChart3 = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Protein intake for this meal", "Protein you still can intake today"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#6f8e26", "#8e7127", "#4286f4"],//CHANGED
            data: [this.sumProtein, this.totalProteinOneDay - this.sumProtein]
          }
        ]
      },
      options: {
        //legend: { display: true },

        title: {
          display: true,
          text: 'Protein Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  createPieChart4() {
    let pie = document.getElementById("pieChart4");
    let pieChart4 = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ["Fiber intake for this meal", "Fiber you still can intake today"],
        datasets: [
          {
            label: "Milligrams",
            backgroundColor: ["#6f8e26", "#8e7127", "#4286f4"],//CHANGED
            data: [this.sumFiber, this.totalFiberOneDay - this.sumFiber]
          }
        ]
      },
      options: {
        //legend: { display: true },

        title: {
          display: true,
          text: 'Fiber Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  
  calculateCaloryOneDay() {
    if (this.global.userGender === "Male") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 5) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else if (this.global.userGender === "Female") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 161) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else {
      console.log(this.global.userGender);
    }
  }

  createAllCharts() {
    this.createPieChart();
    this.createPieChart2();
    this.createPieChart3();
    this.createPieChart4();
  }

  add(x) {
    x.count += 1;

    this.sumCalory += x.calory;
    this.sumCarbohydrates+=x.carbohydrates;
    this.sumProtein+=x.protein;
    this.sumFiber+=x.fiber;

    this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
    this.sumCarbohydratesString=this.sumCarbohydrates.toFixed(2)+'g';
    this.sumProteinString=this.sumProtein.toFixed(2)+'g';
    this.sumFiberString=this.sumFiber.toFixed(2)+'g';

    this.caloryPercentage = (this.sumCalory / this.totalCaloryOneDay * 100).toFixed(2) + '%';
    this.carbohydratesPercentage = (this.sumCarbohydrates / this.totalCarbohydratesOneDay * 100).toFixed(2) + '%';
    this.proteinPercentage = (this.sumProtein / this.totalProteinOneDay * 100).toFixed(2) + '%';
    this.fiberPercentage = (this.sumFiber / this.totalFiberOneDay * 100).toFixed(2) + '%';

    this.createAllCharts();
  }

  minus(x) {
    if (x.count > 0) {
      x.count -= 1;

      this.sumCalory -= x.calory;
      this.sumCarbohydrates-=x.carbohydrates;
      this.sumProtein-=x.protein;
      this.sumFiber-=x.fiber;

      this.sumCaloryString = this.sumCalory.toFixed(2) + 'Cal';
      this.sumCarbohydratesString=this.sumCarbohydrates.toFixed(2)+'g';
      this.sumProteinString=this.sumProtein.toFixed(2)+'g';
      this.sumFiberString=this.sumFiber.toFixed(2)+'g';

      this.caloryPercentage = (this.sumCalory / this.totalCaloryOneDay * 100).toFixed(2) + '%';
      this.carbohydratesPercentage = (this.sumCarbohydrates / this.totalCarbohydratesOneDay * 100).toFixed(2) + '%';
      this.proteinPercentage = (this.sumProtein / this.totalProteinOneDay * 100).toFixed(2) + '%';
      this.fiberPercentage = (this.sumFiber / this.totalFiberOneDay * 100).toFixed(2) + '%';

      this.createAllCharts();
    }
  }

  showAlert() {
    let string1: string = "";

    let count = 1;

    for (let i of this.noInfo) {
      string1 += count + '. ';
      string1 += i;
      string1 += '<br/>';
      count++;
    }
    let alert = this.alertCtrl.create({

      title: 'We cannot find nutrition info for the following items:',
      subTitle: string1,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.loadXML();
  }

  ionViewDidEnter() {
    if (this.hasBadInfo) {
      this.showAlert();
    }

    this.createAllCharts();
  }


  loadXML() {

    for (let entry of this.showList) {
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

    console.log('nutrition data for '+entry.name);
    console.log(this.savedData);

    try {
      entry.calory = this.savedData.Nutrition[1].Value;
      entry.carbohydrates=this.savedData.Nutrition[7].Value;
      entry.protein=this.savedData.Nutrition[10].Value;
      entry.fiber=this.savedData.Nutrition[9].Value;
    }
    catch (e) {
      this.noInfo.push(entry.name);
      const index: number = this.showList.indexOf(entry);
      if (index !== -1) {
        this.showList.splice(index, 1);
      }
      this.hasBadInfo = true;
    }
  }

  calculateCarbohydratesOneDay() {
    /*if (this.global.userGender === "Male") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 5) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else if (this.global.userGender === "Female") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 161) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else {
      console.log(this.global.userGender);
    }*/
    this.totalCarbohydratesOneDay=275.00;
    this.totalCarbohydratesOneDayString=this.totalCarbohydratesOneDay.toFixed(2)+'g';
  }

  calculateProteinOneDay() {
    /*if (this.global.userGender === "Male") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 5) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else if (this.global.userGender === "Female") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 161) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else {
      console.log(this.global.userGender);
    }*/
    this.totalProteinOneDay=50.00;
    this.totalProteinOneDayString=this.totalProteinOneDay.toFixed(2)+'g';
  }

  calculateFiberOneDay() {
    /*if (this.global.userGender === "Male") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 5) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else if (this.global.userGender === "Female") {
      this.totalCaloryOneDay = (10 * this.global.userWeight + 6.25 * this.global.userHeight - 5 * this.global.userAge - 161) * 1.4;
      this.totalCaloryOneDayString = this.totalCaloryOneDay.toFixed(2) + 'Cal';
    }
    else {
      console.log(this.global.userGender);
    }*/
    this.totalFiberOneDay=25.00;
    this.totalFiberOneDayString=this.totalFiberOneDay.toFixed(2)+'g';
  }
}
