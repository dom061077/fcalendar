import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutocompleteObrasocialServiceProvider } from '../../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider  } from '../../providers/autocomplete-localidad/autocomplete-localidad';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

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
  constructor(public navCtrl: NavController, public navParams: NavParams
          ,public autocompleteService:AutocompleteObrasocialServiceProvider
          ,public autocompleteProvinciaProv: AutocompleteProvinciaProvider
          ,public autocompleteLocProv: AutocompleteLocalidadProvider
          ,public formBuilder: FormBuilder
          ,private database: AngularFireDatabase
        ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPacientePage');
  }

  isValid(){
      return this.formAdd.valid;
  }

  provinciaSelected(event){
      this.provinciaKey = event.$key;
      console.log('Provincia key seleccionada: '+this.provinciaKey);
      this.autocompleteLocProv.setProvinciaId(this.provinciaKey);
  }


  confirmar(){
    this.database.list('provincias_localidades',{
      query:{
        orderByChild: 'nombre_provincia'
        ,startAt : 'S'
        ,endAt : 'S\uf8ff'

      }
    }
  ).subscribe(items=>{
    console.log('Subscribe provincia');
    items.forEach(element => {
      console.log('forEach sobre provincia: '+element.nombre_provincia);
    });
  });  

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
