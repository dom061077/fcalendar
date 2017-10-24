import { OnInit, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import {FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";


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
export class AddTurnoPage implements OnInit {
  formAdd: FormGroup;
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
      ,private database: AngularFireDatabase
      ,public formBuilder: FormBuilder  )  {
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
      this.formAdd.controls['duracion'].setValue(event.$key);
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
      console.log('Confirmar evento');
      console.log('Duración: '+this.formAdd.controls['duracion'].value);
      /*console.log('Duracion: '+this.duracion);
      console.log('Date: '+this.date);
      console.log('Minuto de fecha seleccionada: '+this.date.minute());
      console.log('Date sin minutos sumados: '+this.date.toString());
      this.endDate = this.date.clone();
      this.duracion = this.duracion * 1;
      var minutos:number = this.date.minute() + this.duracion;
      console.log('Duración en minutos: '+minutos);
      this.endDate.minutes(minutos);

      console.log('Date con minutos sumados: '+this.endDate.format());
      console.log('Format del Moment: '+this.date.format());
      let turnoAgregado = this.turnos.push({
            end: this.endDate.format(),
            start: this.date.format() ,
            title: this.apellidoNombre
      });
      turnoAgregado.child('paciente/'+this.$keyPaciente).set(
            {apellido:this.apellido,nombre:this.nombre,dni:this.dni}
        );
        */
  }

  pacienteValidator(control: FormControl): {[s: string]: boolean} {
    if (!this.$keyPaciente) {
      return {invalidDuracion: true};
    }
  }

  ngOnInit():any{
//https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      
      this.formAdd = this.formBuilder.group({
        //'pacienteId': ['',[Validators.required]],
          'pacienteId' : ['', Validators.required],
          'duracion'   : ['', [Validators.required, this.pacienteValidator.bind(this)]]
      });

  }



}
