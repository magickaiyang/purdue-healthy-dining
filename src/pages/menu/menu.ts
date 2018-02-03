import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  xmlItems: any;
  today: any;
  diningcourt:string;

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(private http: HttpClient) {
    this.today=Date.now();
  }

  loadXML() {
    var dateFormatted=document.getElementById("date").innerText;
    dateFormatted=dateFormatted.substr(6,10);

    var url='https://api.hfs.purdue.edu/menus/v2/locations/';
    url+=this.diningcourt;
    url+='/';
    url+=dateFormatted;
    //console.log(url);

    this.http.get(url)
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

      var i,j,k, dishes = [];

      for(i in data.Meals) {
        var meal=data.Meals[i];
        for(j in meal.Stations) {
         var station=meal.Stations[j];
         for(k in station.Items) {
           var item= station.Items[k];
           dishes.push({name:item.Name});
         }
        }
      }

      resolve(dishes);
    });


  }

  onSelect() {
    this.loadXML();
  }

}

