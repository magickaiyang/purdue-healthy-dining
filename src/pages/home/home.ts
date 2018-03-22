import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {MenuPage} from "../menu/menu";
import {SettingsPage} from "../settings/settings";
import {ChartPage} from "../chart/chart";
import {SuggestPage} from "../suggest/suggest";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  today: string;
  diningcourt: string;  //dining court selection
  mealTime: string; //meal time selection
  meals: any; //meal times
  savedData: any; //all data pertaining to the current dining court
  public savedMeal: any; //all dishes pertaining tho the current selection

  constructor(private http: HttpClient, private navCtrl: NavController) {
    this.savedMeal = {Stations: [{Items: []}]};  //placeholder
    this.meals = [];
    this.today = new Date().toISOString();
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  suggest() {
    this.navCtrl.push(SuggestPage);
  }

  choose() {
    let data = {savedMeal: this.savedMeal};
    this.navCtrl.push(MenuPage, data);
  }

  loadXML() {
    var url = 'https://api.hfs.purdue.edu/menus/v2/locations/';
    url += this.diningcourt;
    url += '/';
    url += this.today.substr(0,10);

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
      this.mealTime = "";
    else
      this.mealTime = this.meals[0].name;  //set default meal time to the first available

    this.onSelectMeal();  //refresh dishes
  }

  onSelect() {
    this.savedMeal = {Stations: [{Items: []}]};  //clear the dish list when dining court is changed
    this.meals = [];  //clears meal times
    this.loadXML();
  }

  onSelectDate() {
    this.onSelect();
  }

  onSelectMeal() {
    var i;
    for (i in this.savedData.Meals) {
      var meal = this.savedData.Meals[i];
      if (meal.Name == this.mealTime) { //only display relevant dishes
        this.savedMeal = meal;
        break;
      }
    }

    let j, k;
    for (j in this.savedMeal.Stations) {
      let station = this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish = station.Items[k];
        dish.Selected = false;
      }
    }
  }

  chart_demo() {
    this.navCtrl.push(ChartPage);
  }
}
