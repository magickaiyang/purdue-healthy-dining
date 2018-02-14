import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaloryCalculationPage } from './calory-calculation';

@NgModule({
  declarations: [
    CaloryCalculationPage,
  ],
  imports: [
    IonicPageModule.forChild(CaloryCalculationPage),
  ],
})
export class CaloryCalculationPageModule {}
