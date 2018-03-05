import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MenuPage} from "../menu/menu";
import { ChartPage } from '../chart/chart';
import { InfoPage } from '../Info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root= ChartPage;
  tab4Root = InfoPage;

  constructor() {

  }
}
