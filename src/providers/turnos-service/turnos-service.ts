import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import * as moment from 'moment';
import { TurnoItem  } from '../../models/turnos/turno-item.interface';

/*
  Generated class for the TurnosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TurnosServiceProvider {

  constructor(private database: AngularFireDatabase) {
    
  }

  moverTurno(key:string,startMoment:any,endMoment:any){
      var item: FirebaseObjectObservable<any>;
      item = this.database.object('turnos/'+key);
      item.update({
            start:startMoment.format(),
            end:endMoment.format()
      });

  }

  addTurno(turnoItem:TurnoItem){
      const turnos = this.database.list('turnos');
      let turnoAgregado = turnos.push(turnoItem);
/*      turnoAgregado.child('paciente/'+this.$keyPaciente).set(
        {apellido_nombre:this.apellidoNombre,dni:this.dni}
      );      */
  }

  deleteTurno(turnoItem:TurnoItem){
     
     const items = this.database.list('turnos');
     console.log('Removiendo item: '+turnoItem.$key);
     items.remove(turnoItem.$key);
  }

  getTurno(id:string):TurnoItem{
    const item = this.database.object('turnos/'+id);
    const turnoItem={} as TurnoItem;
    turnoItem.paciente = {} as TurnoItem['paciente'];
    const subscription= item.subscribe(item=>{
        turnoItem.$key = item.$key
        turnoItem.start = moment(item.start);
        turnoItem.end = moment(item.end);
        turnoItem.title = item.title;
        turnoItem.paciente.dni = item.paciente.dni;
        turnoItem.paciente.apellido = item.paciente.apellido;
        turnoItem.paciente.nombre = item.paciente.nombre;


    });
    subscription.unsubscribe();
    
    return turnoItem;
  }


}
