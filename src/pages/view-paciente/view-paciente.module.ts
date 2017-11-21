import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPacientePage } from './view-paciente';

@NgModule({
  declarations: [
    ViewPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPacientePage),
  ],
})
export class ViewPacientePageModule {}
