import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})

export class SuggestPage {

  arr: any;
  foodChoices: any;

  constructor(private navCtrl: NavController) {
    this.arr = [];
    this.foodChoices=[];

    for (let i = 0; i < 50; i++) {
      this.arr[i] = [];
      for (let j = 0; j < 7; j++) {
        this.arr[i][j] = Math.floor(Math.random() * 51);
      }
    }
    console.log(this.arr);

    for(let i=0;i<4;i++) {
      this.foodChoices[i]=this.testNut(i,4);
    }
    console.log(this.foodChoices);
  }

  testNut(nutIndex, nutWeight) {
    let calArr = [];

    calArr[0] = [];
    for (let j = 0; j < 50; j++) {
      calArr[0][j] = {index: j, value: this.arr[j][nutIndex]};
    }
    calArr[0].sort(this.sortPair);

    for (let i = 1; i < 4; i++) {
      calArr[i] = [];
      for (let j = 0; j < 50; j++) {
        calArr[i][j] = {index: j, value: this.arr[j][i + 3]};
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
      score[j] = {index:j, value:0};  //init to 0 value
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 50; j++) {
        if (i == 0) {
          score[calArr[i][j].index].value += j*weight[0];
        }
        else {
          score[calArr[i][j].index].value +=(50-j)*weight[i];
        }
      }
    }

    score.sort(this.sortPair);
    //console.log(score);

    let index=49;
    for(let i=0;i<4;i++) {
      if(this.foodChoices[i]==score[index].index) {
        index--;
        i=0;
      }
    }
    return score[index].index;
  }

  sortPair(a, b) {
    return a.value - b.value;
  }

}
