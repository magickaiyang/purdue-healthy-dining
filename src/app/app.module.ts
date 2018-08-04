import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {IonicStorageModule} from '@ionic/storage';


import {HomePage} from '../pages/home/home';
import {MenuPage} from '../pages/menu/menu';
import {CaloryCalculationPage} from '../pages/calory-calculation/calory-calculation';
import {HttpClientModule} from '@angular/common/http';

import {StatusBar} from '@ionic-native/status-bar';
import {SettingsPage} from "../pages/settings/settings";
import {SuggestPage} from "../pages/suggest/suggest";
import {GlobalProvider} from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    CaloryCalculationPage,
    SettingsPage,
    SuggestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    CaloryCalculationPage,
    SettingsPage,
    SuggestPage
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {
}
