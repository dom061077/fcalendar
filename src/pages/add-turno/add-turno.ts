import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';


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
  idTurno:any;
  date:any;
  dateFormat:any;
  hora:any;
  $keyPaciente:string;
  apellidoNombre:string;
  dni:string;

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,public autocompleteService:AutocompletePacienteServiceProvider) {
      this.idTurno = navParams.get('id');
      this.date = navParams.get('date');
      this.dateFormat = navParams.get('dateFormat');
      this.hora = navParams.get('hora');


  }

  itemSelected(event){
      //this.$keyPaciente = evet.
  }


  ionViewDidLoad() {
    
  }

}
