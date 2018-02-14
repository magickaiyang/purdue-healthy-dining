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
  diningcourt: string;
  mealTime: string;
  meals: any;
  savedData: any;
  savedMeal: any;
  selectedID: any;

  constructor(private http: HttpClient, public navCtrl: NavController ) {
    this.today = Date.now();
    this.savedMeal={Stations:[{Items:[]}]};  //placeholder
    this.selectedID=[];
  }

  openCaloryCalculation() {

    let data = {
      title: this.selectedID
    }
    this.navCtrl.push(CaloryCalculationPage, data);

  }

  /************************************************************************************************************/

  itemSelected(item) {

    this.selectedID.push({name:item.Name,id:item.ID});
    console.log(this.selectedID);
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
      if (!this.meals[0])
        this.mealTime="";
      else
        this.mealTime = this.meals[0].name;  //set default meal time to the first available

      resolve(dishes);  //dish list is empty for now
    });
  }

  onSelect() {
    this.savedMeal={Stations:[{Items:[]}]};  //clear the list when dining court is changed
    this.loadXML();
  }

  onSelectMeal() {
    var i;

    for (i in this.savedData.Meals) {
      var meal = this.savedData.Meals[i];
      if (meal.Name != this.mealTime) //only display relevant dishes
        continue;
      this.savedMeal=meal;
    }
  }
}

