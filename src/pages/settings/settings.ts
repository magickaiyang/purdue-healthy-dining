import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {CaloryCalculationPage} from '../calory-calculation/calory-calculation';
import {GlobalProvider} from '../../providers/global/global';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',

})
export class SettingsPage {

  allergy_peanut: boolean;
  allergy_egg: boolean;
  low_carb: boolean;
  vegetarian: boolean;
  gender: string;
  weight: number;
  height: number;
  age: number;

  constructor(private navCtrl: NavController, private storage: Storage, public global: GlobalProvider) {
    console.log(storage.driver);

    this.allergy_peanut=false;
    this.allergy_egg=false;
    this.low_carb=false;
    this.vegetarian=false;
    this.gender = "";
    this.weight = 0;
    this.height = 0;
    this.age = 0;

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

    storage.get('gender').then((val) => {
      this.gender = val;
    });

    storage.get('weight').then((val) => {
      this.weight = val;
    });

    storage.get('height').then((val) => {
      this.height = val;
    });

     storage.get('age').then((val) => {
      this.age = val;
    });

  }

  onSelectGender(){
    this.storage.set("gender", this.gender);
  }

  update_weight(){
    this.storage.set("weight" , this.weight);
  }

  update_height(){
    this.storage.set("height" , this.height);
  }

  update_age(){
    this.storage.set("age" , this.age);
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

  ionViewWillLeave(){
      this.global.userGender = this.gender;
      this.global.userWeight = this.weight;
      this.global.userHeight = this.height;
      this.global.userAge = this.age;
  }
}
