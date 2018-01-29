import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  xmlItems: any;

  items = [
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(private http: HttpClient) {

  }

  loadXML() {
    this.http.get('https://api.hfs.purdue.edu/menus/v2/locations/Wiley/2018-02-01') //hard-coded for now!!
      .subscribe((data) => {
          this.parseXML(data)
            .then((data) => {
              this.xmlItems = data;
            })
        }
      );
  }

  parseXML(data) {
    return new Promise(resolve => {
      var k, arr = [];

      var obj = data.Meals[0].Stations[1];
      for (k in obj.Items) {
        var item = obj.Items[k];
        arr.push({
          name: item.Name,
        });
      }

      resolve(arr);
    });


  }

  ionViewWillEnter() {
    this.loadXML();
  }
}

