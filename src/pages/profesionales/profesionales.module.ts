import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesionalesPage } from './profesionales';

@NgModule({
  declarations: [
    ProfesionalesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesionalesPage),
  ],
})
export class ProfesionalesPageModule {}
