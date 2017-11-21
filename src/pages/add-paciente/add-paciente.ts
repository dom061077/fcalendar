import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompleteObrasocialServiceProvider } from '../../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider  } from '../../providers/autocomplete-localidad/autocomplete-localidad';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { PacienteItem } from '../../models/paciente/paciente-item';
import { PacienteServiceProvider  } from '../../providers/paciente-service/paciente-service'

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
  provinciaKey: any;
  localidad: any;
  obraSocial: any;
  pacienteItem={fechaNacimiento:'',estadoCivil:'',domicilio:'',codigoPostal:''
                  ,telefono:'',sexo:'',email:'',provincia:{nombre:'',$key:''}
                  ,localidad:{nombre:'',$key:'',codigoPostal:''}
                  ,obraSocial:{$key:'',nombre:''}} as PacienteItem;
  constructor(public navCtrl: NavController, public navParams: NavParams
          ,public autocompleteService:AutocompleteObrasocialServiceProvider
          ,public autocompleteProvinciaProv: AutocompleteProvinciaProvider
          ,public autocompleteLocProv: AutocompleteLocalidadProvider
          ,public formBuilder: FormBuilder
          ,private database: AngularFireDatabase
          ,private pacienteService: PacienteServiceProvider
        ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPacientePage');
  }

  isValid(){
      return !this.formAdd.valid;
  }

  provinciaSelected(event){
      this.pacienteItem.provincia.$key = event.$key;
      this.pacienteItem.provincia.nombre = event.nombre;
      this.autocompleteLocProv.setProvinciaId(this.pacienteItem.provincia.$key);
  }

  localidadSelected(event){
      this.pacienteItem.localidad.$key = event.$key;
      this.pacienteItem.localidad.nombre = event.nombre;
      this.pacienteItem.localidad.codigoPostal = event.codigoPostal;
  }

  obraSocialSelected(event){
      this.pacienteItem.obraSocial.$key = event.$key;
      this.pacienteItem.obraSocial.nombre = event.nombre;
  }



  confirmar(){
      this.pacienteService.addPaciente(this.pacienteItem);
      this.navCtrl.pop();
  }



  ngOnInit():any{
    //https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      
          this.formAdd = this.formBuilder.group({
            //'pacienteId': ['',[Validators.required]],
              'dni'   : ['', [Validators.required]],
              'apellido'   : ['', [Validators.required]],
              'nombre'   : ['', [Validators.required]],
              'fechaNacimiento'   : [''],
              'domicilio'   : [''],
              'codigoPostal'   : [''],
              'telefono'   : [''],
              'sexo'   : [''],
              'estadoCivil'   : ['']
          });
    
  }  

}
