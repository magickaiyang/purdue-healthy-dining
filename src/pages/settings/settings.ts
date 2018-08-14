import {Component} from '@angular/core';
import {GlobalProvider} from '../../providers/global/global';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',

})
export class SettingsPage {

  allergy_peanut: boolean;
  allergy_egg: boolean;
  vegetarian: boolean;
  userGender: string;
  userWeight: number;
  userHeight: number;
  userAge: number;

  constructor(public global: GlobalProvider) {
    this.allergy_peanut = this.global.allergy_peanut;
    this.allergy_egg = this.global.allergy_egg;
    this.vegetarian = this.global.vegetarian;
    this.userGender = this.global.userGender;
    this.userWeight = this.global.userWeight*2.20462;  //kg to lbs
    this.userHeight = this.global.userHeight*0.0328084;  //cm to ft
    this.userAge = this.global.userAge;
  }

  onSelectGender() {
    this.global.userGender = this.userGender;
  }

  update_weight() {
    this.global.userWeight = this.userWeight*0.453592;  //lbs to kg
  }

  update_height() {
    this.global.userHeight = this.userHeight*30.48;  //ft to cm
  }

  update_age() {
    this.global.userAge = this.userAge;
  }

  update_peanut() {
    this.global.allergy_peanut = this.allergy_peanut;
  }

  update_egg() {
    this.global.allergy_egg = this.allergy_egg;
  }

  update_vegetarian() {
    this.global.vegetarian = this.vegetarian;
  }

  ionViewWillLeave() {
    this.global.save();
  }
}
