import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompletePacienteServiceProvider  } from '../../providers/autocomplete-paciente-service/autocomplete-paciente-service';

/**
 * Generated class for the AddPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-paciente',
  templateUrl: 'add-paciente.html',
})
export class AddPacientePage {

  constructor(public navCtrl: NavController, public navParams: NavParams
          ,public autocompleteService:AutocompletePacienteServiceProvider
        ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPacientePage');
  }

}
