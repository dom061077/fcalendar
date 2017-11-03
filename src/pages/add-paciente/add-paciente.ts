import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompleteObrasocialServiceProvider } from '../../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../../providers/autocomplete-provincia/autocomplete-provincia';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";

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
  formAdd: FormGroup;
  provincia: any;
  localidad: any;
  obraSocial: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
          ,public autocompleteService:AutocompleteObrasocialServiceProvider
          ,public autocompleteProvicinaProv: AutocompleteProvinciaProvider
          ,public formBuilder: FormBuilder
        ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPacientePage');
  }

  isValid(){
      return this.formAdd.valid;
  }


  confirmar(){
      
  }

  ngOnInit():any{
    //https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      
          this.formAdd = this.formBuilder.group({
            //'pacienteId': ['',[Validators.required]],
              'dni'   : ['', [Validators.required]],
              'apellido'   : ['', [Validators.required]],
              'nombre'   : ['', [Validators.required]],
              'fechaNacimiento'   : ['', [Validators.required]],
              'domicilio'   : ['', [Validators.required]],
              'codigoPostal'   : ['', [Validators.required]],
              'telefono'   : ['', [Validators.required]],
              'sexo'   : ['', [Validators.required]],
              'estadoCivil'   : ['', [Validators.required]]
          });
    
  }  

}
