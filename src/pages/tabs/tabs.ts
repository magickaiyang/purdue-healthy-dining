import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MenuPage} from "../menu/menu";
import {SettingsPage} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
