import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  xmlItems: any;
  today: any;
  diningcourt: string;
  mealTime: string;
  meals: any;
  savedData: any;
  savedMeal: any;

  constructor(private http: HttpClient) {
    this.today = Date.now();
    this.savedMeal={Stations:[{Items:[]}]};  //placeholder
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  loadXML() {
    var dateFormatted = document.getElementById("date").innerText;
    dateFormatted = dateFormatted.substr(6, 10);

    var url = 'https://api.hfs.purdue.edu/menus/v2/locations/';
    url += this.diningcourt;
    url += '/';
    url += dateFormatted;
    //console.log(url);

    this.http.get(url)
      .subscribe((data) => {
          this.parseXML(data)
            .then((data) => {
              this.xmlItems = data;
              this.onSelectMeal();
            })
        }
      );
  }

  parseXML(data) {
    return new Promise(resolve => {
      this.savedData = data;  //save data to process after a meal time has been selected

      var i, meals = [], dishes = [];
      for (i in data.Meals) {  //get list of meal times
        var meal = data.Meals[i];
        meals.push({name: meal.Name});
      }

      this.meals = meals;
      if (!this.meals)
        this.mealTime="";
      else
        this.mealTime = this.meals[0].name;  //set default meal time to the first available

      resolve(dishes);  //dish list is empty for now
    });


  }

  onSelect() {
    this.loadXML();
  }

  onSelectMeal() {
    var i, j, k, dishes = [];

    for (i in this.savedData.Meals) {
      var meal = this.savedData.Meals[i];

      if (meal.Name != this.mealTime) //only display relevant dishes
        continue;
      this.savedMeal=meal;

      for (j in meal.Stations) {
        var station = meal.Stations[j];
        for (k in station.Items) {
          var item = station.Items[k];
          dishes.push({name: item.Name});
        }
      }
    }
    this.xmlItems = dishes;
  }

}

