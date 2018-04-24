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
      /*var item: FirebaseObjectObservable<any>;
      item = this.database.object('turnos/'+key);
      item.update({
            start:startMoment.format(),
            end:endMoment.format()
      });*/

      const turnoItem = this.database.object('turnos/'+key);
      //let $pacienteKey = Object.keys(turnoItem.paciente);
      let updateObject = {};
      
      const subscription = turnoItem.subscribe(item=>{
            updateObject['turnos/'+key+'/end']=endMoment.format();
            updateObject['turnos/'+key+'/start']=startMoment.format();
            updateObject['pacientes/'+Object.keys(item.paciente)+'/turnos/'+key+'/end']=endMoment.format();
            updateObject['pacientes/'+Object.keys(item.paciente)+'/turnos/'+key+'/start']=startMoment.format();
      });
      this.database.object('/').update(updateObject);
      subscription.unsubscribe();

  }

  addTurno(turnoItem:TurnoItem,$keyPaciente){
      //const turnos = this.database.list('turnos');
     // let turnoAgregado = turnos.push(turnoItem);
/*      turnoAgregado.child('paciente/'+this.$keyPaciente).set(
        {apellido_nombre:this.apellidoNombre,dni:this.dni}
      );      */
      let updateObject = {};
      const turnos = this.database.list('turnos');
      let turnoAgregado = turnos.push(turnoItem);
      updateObject['pacientes/'+$keyPaciente+'/turnos/'
          +turnoAgregado.key]=turnoItem;
      this.database.object('/').update(updateObject);
      console.log(updateObject);
  }

  deleteTurno(turnoItem:TurnoItem){
     
     const items = this.database.list('turnos');
     const $pacienteKey = Object.keys(turnoItem.paciente);
     let removeObject = {};
     removeObject['pacientes/'+$pacienteKey+'/turnos/'+turnoItem.$key]=null;
     this.database.object('/').update(removeObject);
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
        turnoItem.paciente = item.paciente;

        
        
        //turnoItem.paciente.dni = item.paciente.dni;
        //turnoItem.paciente.apellido = item.paciente.apellido;
        //turnoItem.paciente.nombre = item.paciente.nombre;


    });
    subscription.unsubscribe();
    
    return turnoItem;
  }


}
