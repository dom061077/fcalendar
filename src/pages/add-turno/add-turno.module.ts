import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTurnoPage } from './add-turno';

@NgModule({
  declarations: [
    AddTurnoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTurnoPage),
  ],
})
export class AddTurnoPageModule {}
