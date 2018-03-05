import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  allergy_peanut: boolean;
  allergy_egg: boolean;
  low_carb: boolean;
  vegetarian: boolean;

  constructor(private navCtrl: NavController, private storage: Storage) {
    console.log(storage.driver);

    this.allergy_peanut=false;
    this.allergy_egg=false;
    this.low_carb=false;
    this.vegetarian=false;

    storage.get('allergy_peanut').then((val) => {
      if(val) {
        this.allergy_peanut=val;
      }
    });
    storage.get('allergy_egg').then((val) => {
      if(val) {
        this.allergy_egg=val;
      }
    });
    storage.get('low_carb').then((val) => {
      if(val) {
        this.low_carb=val;
      }
    });
    storage.get('vegetarian').then((val) => {
      if(val) {
        this.vegetarian=val;
      }
    });
  }

  update_peanut() {
    this.storage.set("allergy_peanut",this.allergy_peanut);
  }

  update_egg() {
    this.storage.set("allergy_egg",this.allergy_egg);
  }

  update_low() {
    this.storage.set("low_carb",this.low_carb);
  }

  update_vegetarian() {
    this.storage.set("vegetarian",this.vegetarian);
  }
}
