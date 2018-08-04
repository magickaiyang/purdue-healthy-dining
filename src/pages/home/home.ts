import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {MenuPage} from "../menu/menu";
import {SettingsPage} from "../settings/settings";
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
  savedMeal: any; //all dishes pertaining tho the current selection

  constructor(private http: HttpClient, private navCtrl: NavController) {
    this.savedMeal = {Stations: [{Items: []}]};  //placeholder
    this.meals = [];
    this.today = new Date(new Date().toLocaleDateString()).toISOString();
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  suggest() {
    let data = {
      savedMeal: this.savedMeal
    };
    this.navCtrl.push(SuggestPage, data);
  }

  choose() {
    let data = {savedMeal: this.savedMeal};
    this.navCtrl.push(MenuPage, data);
  }

  loadXML() {
    var url = 'https://api.hfs.purdue.edu/menus/v2/locations/';

    if(this.diningcourt) {
      url += this.diningcourt;
    }
    else {
      return;
    }

    url += '/';
    url += this.today.substr(0, 10);

    this.http.get(url)
      .subscribe((data) => {
          this.parseXML(data)
        }
      );
  }

  parseXML(data) {
    this.savedData = data;  //save data to process after a meal time has been selected

    for (let i in data.Meals) {  //get list of meal times
      let meal = data.Meals[i];
      let Hours = {StartTime: meal.Hours.StartTime.substring(0, 5), EndTime: meal.Hours.EndTime.substring(0, 5)}; //hour and minute only
      this.meals.push({name: meal.Name, hours: Hours});
    }

    if (!this.meals[0]) {
      this.mealTime = "";
    }
    else {
      let currentHour = new Date().getHours();
      this.mealTime = this.meals[0].name;  //early in the morning! set default meal time to the first available

      for (let i = this.meals.length - 1; i >= 0; i--) {
        console.log(parseInt(this.meals[i].hours.StartTime.substring(0, 2)));
        if (currentHour >= parseInt(this.meals[i].hours.StartTime.substring(0, 2))) {
          this.mealTime = this.meals[i].name;
          break;
        }
      }
    }

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
}
