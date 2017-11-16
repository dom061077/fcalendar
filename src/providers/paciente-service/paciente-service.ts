import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { PacienteItem  } from '../../models/paciente/paciente-item';

/*
  Generated class for the PacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacienteServiceProvider {
  pacientesRef : FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
      this.pacientesRef = this.database.list('pacientes');
  }

  addPaciente(pacienteItem:PacienteItem){
      this.pacientesRef.push({


      });      
  }


}
