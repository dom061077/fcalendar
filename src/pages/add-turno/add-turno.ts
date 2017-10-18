import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';


/**
 * Generated class for the AddTurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-turno',
  templateUrl: 'add-turno.html',
})
export class AddTurnoPage {
  turnos : FirebaseListObservable<any[]>;
  idTurno:any;
  date:any;
  dateFormat:any;
  hora:any;
  duracion:number;
  endDate:any;
  $keyPaciente:string;
  apellidoNombre:string;
  apellido:string;
  nombre:string;
  dni:string;

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,public autocompleteService:AutocompletePacienteServiceProvider
      ,private database: AngularFireDatabase) {
      this.turnos = database.list('turnos');
      this.idTurno = navParams.get('id');
      this.date = navParams.get('date');
      this.dateFormat = navParams.get('dateFormat');
      this.hora = navParams.get('hora');
      this.duracion = navParams.get('duracion');
      if(!this.idTurno){
          console.log('No tiene ID de turno');
      }
    

  }


  /* método que captura la información del paciente seleccionado
     en el autocomplete 
  */ 
  itemSelected(event){
      this.$keyPaciente = event.$key;
      console.log('key de paciente: '+this.$keyPaciente);
      this.apellido = event.apellido;
      this.apellidoNombre = event.apellidoNombre,
      this.nombre = event.nombre;
      this.dni = event.dni;

      console.log('Apellido y nombre seleccionado: '+this.apellidoNombre);

  }


  ionViewDidLoad() {
    
  }

  confirmar(){
      console.log('Duracion: '+this.duracion);
      console.log('Date: '+this.date);
      console.log('Minuto de fecha seleccionada: '+this.date.minute());
      console.log('Date sin minutos sumados: '+this.date.toString());
      this.endDate = this.date;
      this.duracion = this.duracion * 1;
      var minutos:number = this.date.minute() + this.duracion;
      console.log('Duración en minutos: '+minutos);
      this.endDate.minutes(minutos);

      console.log('Date con minutos sumados: '+this.endDate.toString());
      this.turnos.push({
            end: this.date.toString(),
            start: this.endDate.toString(),
            title: this.apellidoNombre,
            paciente:{
                this.$keyPaciente:{
                    apellido:this.apellido,
                    nombre: this.nombre,
                    dni: this.dni
                }
            }

      });
  }

}
