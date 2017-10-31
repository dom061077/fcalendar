import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPacientePage } from './add-paciente';

@NgModule({
  declarations: [
    AddPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPacientePage),
  ],
})
export class AddPacientePageModule {}
