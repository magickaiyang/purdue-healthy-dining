import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from 'ionic-angular';
import {CaloryCalculationPage} from '../calory-calculation/calory-calculation';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})


export class MenuPage {
  today: any;
  diningcourt: string;  //dining court selection
  mealTime: string; //meal time selection
  meals: any; //meal times
  savedData: any; //all data pertaining to the current dining court
  savedMeal: any; //all dishes pertaining tho the current selection
  selectedID: any;  //all dishes selected

  constructor(private http: HttpClient, public navCtrl: NavController ) {
    this.today = Date.now();
    this.savedMeal={Stations:[{Items:[]}]};  //placeholder
    this.meals=[];
  }

  openCaloryCalculation() {
    let selectedID=[];
    let j,k;
    for (j in this.savedMeal.Stations) {
      let station=this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish=station.Items[k];
        if(dish.Selected==true) {
          selectedID.push({name:dish.Name,id:dish.ID});
        }
      }
    }
    let data = {
      title: selectedID
    };
    console.log(data);
    this.navCtrl.push(CaloryCalculationPage, data);
  }

  itemSelected(item) {
    item.Selected=!item.Selected;
  }

  loadXML() {
    var dateFormatted = document.getElementById("date").innerText;
    dateFormatted = dateFormatted.substr(6, 10);

    var url = 'https://api.hfs.purdue.edu/menus/v2/locations/';
    url += this.diningcourt;
    url += '/';
    url += dateFormatted;

    this.http.get(url)
      .subscribe((data) => {
          this.parseXML(data)
        }
      );
  }

  parseXML(data) {
      this.savedData = data;  //save data to process after a meal time has been selected

      var i;
      for (i in data.Meals) {  //get list of meal times
        var meal = data.Meals[i];
        this.meals.push({name: meal.Name});
      }

      if (!this.meals[0])
        this.mealTime="";
      else
        this.mealTime = this.meals[0].name;  //set default meal time to the first available

      this.onSelectMeal();  //refresh dishes
  }

  onSelect() {
    this.savedMeal={Stations:[{Items:[]}]};  //clear the dish list when dining court is changed
    this.meals=[];  //clears meal times
    this.loadXML();
  }

  onSelectMeal() {
    this.selectedID=[]; //clear the selected dish list

    var i;
    for (i in this.savedData.Meals) {
      var meal = this.savedData.Meals[i];
      if (meal.Name == this.mealTime) { //only display relevant dishes
        this.savedMeal = meal;
        break;
      }
    }

    let j,k;
    for (j in this.savedMeal.Stations) {
      let station=this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish=station.Items[k];
        dish.Selected=false;
      }
    }
  }
}
