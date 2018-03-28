import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})

export class SuggestPage {

  arr: any;
  foodChoices: any;
  savedMeal: any;
  dishes: any;

  constructor(private navCtrl: NavController,private http: HttpClient) {
    this.arr = [];
    this.foodChoices = [];
    this.dishes = [];

    /*for (let i = 0; i < 50; i++) {
      this.arr[i] = [];
      for (let j = 0; j < 7; j++) {
        this.arr[i][j] = Math.floor(Math.random() * 51);
      }
    }*/

    this.savedMeal = this.navCtrl.get('savedMeal');
    let j, k;
    for (j in this.savedMeal.Stations) {
      let station = this.savedMeal.Stations[j];
      for (k in station.Items) {
        let dish = station.Items[k];
        this.dishes.push({
          name: dish.Name,
          id: dish.ID,
          selected: false
        })
      }
    }

    let i;
    for(i in this.dishes) {
      let dish=this.dishes[i];
      this.arr[i]=[];
      this.loadXML(dish.id,i);
    }
    console.log(this.arr);
    console.log(this.dishes);

    for (let i = 0; i < 4; i++) {
      this.foodChoices[i] = this.testNut(i, 4);
    }
    console.log(this.foodChoices);
  }

  loadXML(id,index) {

    
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
    try{
      this.arr[index][0] = data.Nutrition[1].Value; //calories
      this.arr[index][1] = data.Nutrition[7].Value; //carbonhydrate
      this.arr[index][2] = data.Nutrition[10].Value;  //protein
      this.arr[index][4] = data.Nutrition[9].Value; //dietary fiber
      this.arr[index][5] = data.Nutrition[3].Value; //fat
      this.arr[index][6] = data.Nutrition[5].Value; //cholesterol
      this.arr[index][7] = data.Nutrition[6].Value; //sodium
    }
    catch(e){ //no info for this dish
      this.arr.splice(index,1); //delete dish from arr
      this.dishes.splice(index,1);  //delete dish from dishes
    }
  }

  testNut(nutIndex, nutWeight) {
    let calArr = [];

    calArr[0] = [];
    for (let j = 0; j < 50; j++) {
      calArr[0][j] = { index: j, value: this.arr[j][nutIndex] };
    }
    calArr[0].sort(this.sortPair);

    for (let i = 1; i < 4; i++) {
      calArr[i] = [];
      for (let j = 0; j < 50; j++) {
        calArr[i][j] = { index: j, value: this.arr[j][i + 3] };
      }
      calArr[i].sort(this.sortPair);
    }

    //console.log(calArr);
    //==============================================
    let weight = [4, 2, 2, 2];
    let res = 4 - nutWeight;
    let diff = res / 3;
    for (let i = 1; i < 4; i++) {
      weight[i] += diff;
    }
    weight[0] = nutWeight;
    //===============================================
    let score = [];
    for (let j = 0; j < 50; j++) {
      score[j] = { index: j, value: 0 };  //init to 0 value
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 50; j++) {
        if (i == 0) {
          score[calArr[i][j].index].value += j * weight[0];
        }
        else {
          score[calArr[i][j].index].value += (50 - j) * weight[i];
        }
      }
    }

    score.sort(this.sortPair);
    //console.log(score);

    let index = 49;
    for (let i = 0; i < 4; i++) {
      if (this.foodChoices[i] == score[index].index) {
        index--;
        i = 0;
      }
    }
    return score[index].index;
  }

  sortPair(a, b) {
    return a.value - b.value;
  }

}
