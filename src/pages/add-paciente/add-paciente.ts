import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompleteObrasocialServiceProvider } from '../../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider  } from '../../providers/autocomplete-localidad/autocomplete-localidad';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { PacienteItem } from '../../models/paciente/paciente-item';
import { PacienteServiceProvider  } from '../../providers/paciente-service/paciente-service';
import { DniValidator } from '../../validators/dni.validator';

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
  @ViewChild('provinciaSearchBar')
  provinciaSearchBar:AutoCompleteComponent;  
  @ViewChild('localidadSearchBar')
  localidadSearchBar:AutoCompleteComponent;
  @ViewChild('obraSocialSearchBar')
  obraSocialSearchBar:AutoCompleteComponent;
  formAdd: FormGroup;
  provinciaKey: any;
  localidad: any;
  provinciaName:string;
  localidadName:string;
  obraSocialName:string;
  obraSocial: any;
  pacienteItem={fechaNacimiento:'',estadoCivil:'',domicilio:'',codigoPostal:''
                  ,telefono:'',sexo:'',email:'' } as PacienteItem;
  constructor(public navCtrl: NavController, public navParams: NavParams
          ,public autocompleteService:AutocompleteObrasocialServiceProvider
          ,public autocompleteProvinciaProv: AutocompleteProvinciaProvider
          ,public autocompleteLocProv: AutocompleteLocalidadProvider
          ,public formBuilder: FormBuilder
          ,private database: AngularFireDatabase
          ,private pacienteService: PacienteServiceProvider
          ,private dniValidator: DniValidator
        ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPacientePage');
  }

  isValid(){
      return !this.formAdd.valid;
  }

  provinciaSelected(event){
//      this.pacienteItem.provincia.$key = event.$key;
//      this.pacienteItem.provincia.nombre = event.nombre;
      this.pacienteItem.provincia={};
      this.pacienteItem.provincia[event.$key]={nombre_provincia:event.nombre};
      this.autocompleteLocProv.setProvinciaId(event.$key);
      this.provinciaName = event.nombre;
      this.localidadSearchBar.setValue('');
      this.localidadName = '';
      this.pacienteItem.codigoPostal='';
  }

  onCancelProvincia(){
      this.pacienteItem.localidad={};
      this.pacienteItem.provincia={};
      this.pacienteItem.codigoPostal='';

      this.localidadSearchBar.setValue('');
      this.localidadName = '';
      this.pacienteItem.codigoPostal='';

      this.provinciaSearchBar.setValue('');
      this.provinciaName='';
      
      
  }

  localidadSelected(event){
      /*this.pacienteItem.localidad.$key = event.$key;
      this.pacienteItem.localidad.nombre = event.nombre;
      this.pacienteItem.localidad.codigoPostal = event.codigoPostal;
      */
      this.pacienteItem.localidad={};
      this.pacienteItem.localidad[event.$key] = {localidad_nombre:event.nombre};
      this.pacienteItem.codigoPostal = event.codigoPostal;
      this.localidadName = event.nombre;

  }

  onCancelLocalidad(){
      this.localidadSearchBar.setValue('');
      this.localidadName = '';
      this.pacienteItem.codigoPostal = '';
      this.pacienteItem.localidad={};
  }

  obraSocialSelected(event){
      /*this.pacienteItem.obraSocial.$key = event.$key;
      this.pacienteItem.obraSocial.nombre = event.nombre;
      */
      this.pacienteItem.obraSocial = {};
      this.pacienteItem.obraSocial[event.$key]={nombre:event.descripcion}
      this.obraSocialName = event.descripcion;
  }

  onCancelObraSocial(){
    this.pacienteItem.obraSocial = {};
    this.obraSocialName = '';
    this.obraSocialSearchBar.setValue('');
  }



  confirmar(){
      this.pacienteService.addPaciente(this.pacienteItem);
      this.navCtrl.pop();
  }



  ngOnInit():any{
    //https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/2      
          this.formAdd = this.formBuilder.group({
            //'pacienteId': ['',[Validators.required]],
              'dni'   : ['', [Validators.required],this.dniValidator.checkDni.bind(this.dniValidator)],
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
