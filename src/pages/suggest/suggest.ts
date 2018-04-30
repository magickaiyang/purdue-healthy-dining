import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CaloryCalculationPage} from "../calory-calculation/calory-calculation";

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})

export class SuggestPage {

  arr: any; //nutrition info for dishes
  foodChoices: any; //[nutrition base][choices]
  foodSelections: any;  //[4]
  savedMeal: any; //original menu data
  dishes: any;  //reorganized from savedMeal


  constructor(private navCtrl: NavController, private navParams: NavParams, private http: HttpClient) {
    this.arr = [];
    this.foodChoices = [];
    this.dishes = [];
    this.foodSelections = [];

    this.savedMeal = this.navParams.get('savedMeal');
    let j, k;
    for (j in this.savedMeal.Stations) {
      let station = this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish = station.Items[k];
        this.dishes.push({
          name: dish.Name,
          id: dish.ID
        })
      }
    }

    for (let i = 0; i < this.dishes.length; i++) {
      let dish = this.dishes[i];
      this.arr[i] = [];
      this.loadXML(dish.id, i);
    }

    this.generate();  //generate suggestions
  }

  async generate() {
    await this.sleep(2000); //for now, pause for two seconds to wait for info to load over network

    console.log(this.arr);
    console.log(this.dishes);

    for (let i = 0; i < 4; i++) {
      this.foodChoices[i] = this.testNut(i, 4);
    }

    for (let i = 0; i < 4; i++) {
      let index = 0;
      this.foodSelections[i] = this.foodChoices[i][index];  //choose first one
      for (let j = 0; j < i; j++) {
        if (this.foodSelections[j] == this.foodSelections[i]) {
          this.foodSelections[i] = this.foodChoices[i][++index];  //next one
          j = 0;  //search from the beginning
        }
      }
    }

    console.log('this.foodSelections');
    console.log(this.foodSelections);

    console.log(this.dishes[this.foodSelections[0]].name);


  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  loadXML(id, index) {


    let url = 'https://api.hfs.purdue.edu/menus/v2/items/';
    url += id;

    //console.log(url);

    this.http.get(url)
      .subscribe((data) => {
          this.parseXML(data, index)
        }
      );
  }

  parseXML(data, index) {
    try {
      this.arr[index][0] = data.Nutrition[1].Value; //calories
      this.arr[index][1] = data.Nutrition[7].Value; //carbonhydrate
      this.arr[index][2] = data.Nutrition[10].Value;  //protein
      this.arr[index][3] = data.Nutrition[9].Value; //dietary fiber
      this.arr[index][4] = data.Nutrition[3].Value; //fat
      this.arr[index][5] = data.Nutrition[5].Value; //cholesterol
      this.arr[index][6] = data.Nutrition[6].Value; //sodium
    }
    catch (e) { //no info for this dish
      this.arr[index].length = 7;
      this.arr[index][0] = 0; //make this dish super bad!
      this.arr[index][1] = 0;
      this.arr[index][2] = 0;
      this.arr[index][3] = 0;
      this.arr[index][4] = 5000;
      this.arr[index][5] = 5000;
      this.arr[index][6] = 5000;
    }
  }

  testNut(nutIndex, nutWeight) {
    //console.log('nutindex='+nutIndex);

    let calArr = [];

    calArr[0] = [];
    for (let j = 0; j < (this.arr.length); j++) {
      calArr[0][j] = {index: j, value: this.arr[j][nutIndex]};
    }

    calArr[0].sort(SuggestPage.sortPair);

    for (let i = 1; i < 4; i++) {
      calArr[i] = [];
      for (let j = 0; j < (this.arr.length); j++) {
        calArr[i][j] = {index: j, value: this.arr[j][i + 3]};
      }
      calArr[i].sort(SuggestPage.sortPair);
    }

    //console.log('calArr');
    //console.log(calArr);

    //==============================================
    let weight = [4, 2, 2, 2];
    let res = 4 - nutWeight;
    let diff = res / 3;
    for (let i = 1; i < 4; i++) {
      weight[i] += diff;
    }
    weight[0] = nutWeight;

    //console.log('weight[]='+weight);
    //===============================================
    let score = [];
    for (let j = 0; j < (this.arr.length); j++) {
      score[j] = {index: j, value: 0};  //init to 0 value
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < (this.arr.length); j++) {
        if (calArr[i][j].index == 3) {
          //console.log(score[calArr[i][j].index]);
        }

        if (i == 0) {
          score[calArr[i][j].index].value += j * weight[0];
        }
        else {
          score[calArr[i][j].index].value += ((this.arr.length) - j) * weight[i];
        }
      }
    }

    score.sort(SuggestPage.sortPair);

    //console.log('score[]');
    //console.log(score);

    let choices = [];
    for (let i = 0; i < 5 && i < score.length; i++) {
      choices[i] = score[this.arr.length - 1 - i].index;
    }
    /*for (let i = 0; i < 4; i++) {
      if (this.foodChoices[i] == score[index].index) {
        index--;
        i = 0;
      }
    }*/

    return choices;
  }

  static sortPair(a, b) {
    return a.value - b.value;
  }

  openCaloryCalculation() {
    let selectedID = [];

    for (let i = 0; i < this.foodSelections.length; i++) {
      selectedID.push({name: this.dishes[this.foodSelections[i]].name, id: this.dishes[this.foodSelections[i]].id});
    }
    //selectedID.push({name:dish.Name,id:dish.ID});

    let data = {
      title: selectedID
    };
    console.log(data);
    this.navCtrl.push(CaloryCalculationPage, data);
  }

  onSelectEnergy() {
    console.log(this.foodSelections[0]);
  }

  onSelectCarb() {

  }

  onSelectProtein() {

  }

  onSelectFiber() {

  }
}
