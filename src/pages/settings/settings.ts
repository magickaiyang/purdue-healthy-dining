import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  allergy_peanut: boolean;
  allergy_egg: boolean;
  low_carb: boolean;
  vegetarian: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allergy_peanut=true;
    this.allergy_egg=false;
    this.low_carb=false;
    this.vegetarian=true;
  }
}
