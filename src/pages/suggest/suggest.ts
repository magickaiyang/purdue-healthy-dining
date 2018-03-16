import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html'
})

export class HomePage {
  data: any;

  constructor(private navCtrl: NavController) {
    this.data =
      [{index: 0, value: 32},
        {index: 1, value: 48},
        {index: 2, value: 43},
        {index: 3, value: 75}];

    this.data.push({});

    this.data.sort(this.sortPair);
  }

  sortPair(a,b) {
    return a.value-b.value;
  }

}
