import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GlobalProvider {

  public allergy_peanut: boolean;
  public allergy_egg: boolean;
  public vegetarian: boolean;
  public userGender: string;
  public userHeight: number;
  public userWeight: number;
  public userAge: number;

  constructor(private storage: Storage) {
    console.log('Hello GlobalProvider Provider');
    console.log(storage.driver);

    this.allergy_peanut = false;
    this.allergy_egg = false;
    this.vegetarian = false;
    this.userGender = 'Female';
    this.userAge = 20;
    this.userHeight = 180;
    this.userWeight = 70;

    storage.get('allergy_peanut').then((val) => {
      if (val) {
        this.allergy_peanut = val;
      }
    });
    storage.get('allergy_egg').then((val) => {
      if (val) {
        this.allergy_egg = val;
      }
    });
    storage.get('vegetarian').then((val) => {
      if (val) {
        this.vegetarian = val;
      }
    });

    storage.get('gender').then((val) => {
      if(val) {
      this.userGender = val;
      }
    });

    storage.get('weight').then((val) => {
      if(val){this.userWeight = val;}
    });

    storage.get('height').then((val) => {
      if(val){this.userHeight = val;}
    });

    storage.get('age').then((val) => {
      if(val){this.userAge = val;}
    });
  }

  public save() {
    this.storage.set("gender", this.userGender);
    this.storage.set("weight", this.userWeight);
    this.storage.set("height", this.userHeight);
    this.storage.set("age", this.userAge);
    this.storage.set("allergy_peanut", this.allergy_peanut);
    this.storage.set("allergy_egg", this.allergy_egg);
    this.storage.set("vegetarian", this.vegetarian);
  }
}
