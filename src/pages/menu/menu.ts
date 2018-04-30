import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CaloryCalculationPage} from '../calory-calculation/calory-calculation';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  savedMeal: any; //all dishes pertaining tho the current selection

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.savedMeal = this.navParams.get("savedMeal");
  }

  openCaloryCalculation() {
    let selectedID = [];
    let j, k;
    for (j in this.savedMeal.Stations) {
      let station = this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish = station.Items[k];
        if (dish.Selected == true) {
          selectedID.push({name: dish.Name, id: dish.ID});
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
    item.Selected = !item.Selected;
  }
}
