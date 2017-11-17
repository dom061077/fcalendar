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

  /**
   * 
   *         $key : string;
        dni : string;
        apellido: string;
        nombre: string;
        fechaNacimiento: string;
        estado_civil: string;
        domicilio : string;
        provincia: {$key:'',name:''};
        localidad: {$key:'',name:''};
        codigoPostal: string;
        telefono : string;
        sexo : string;
        estadoCivi: string;
        obraSocial: {$key:'',name:''};
   */

  addPaciente(pacienteItem:PacienteItem){
      let pacienteRef = this.pacientesRef.push({
          apellido_nombre:pacienteItem.apellido+' '+pacienteItem.nombre,
          dni: pacienteItem.dni,
          fecha_nacimiento: pacienteItem.fechaNacimiento,
          estado_civil: pacienteItem.estadoCivil,
          domicilio: pacienteItem.domicilio,
          codigo_postal: pacienteItem.codigoPostal,
          email:pacienteItem.email,
          telefono: pacienteItem.telefono,
          sexo: pacienteItem.sexo
      });      

      if (pacienteItem.provincia.$key!='' && pacienteItem.provincia.$key!=undefined)
            pacienteRef.child('provincia/'+pacienteItem.provincia.$key).set({
                  nombre:pacienteItem.provincia.nombre
            });
      if (pacienteItem.localidad.$key!='' && pacienteItem.localidad.$key!=undefined)      
            pacienteRef.child('localidad/'+pacienteItem.localidad.$key).set({
                nombre:pacienteItem.localidad.nombre,codigo_postal:pacienteItem.localidad.codigoPostal
            });
      if (pacienteItem.obraSocial.$key!='' && pacienteItem.obraSocial.$key!=undefined)     
            pacienteRef.child('obra_scocial/'+pacienteItem.obraSocial.$key).set({
                
            });

  }


}
