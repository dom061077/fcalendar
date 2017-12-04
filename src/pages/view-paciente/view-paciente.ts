import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacienteItem } from '../../models/paciente/paciente-item';
import { AutocompleteObrasocialServiceProvider } from '../../providers/autocomplete-obrasocial-service/autocomplete-obrasocial-service';
import { AutocompleteProvinciaProvider } from '../../providers/autocomplete-provincia/autocomplete-provincia';
import { AutocompleteLocalidadProvider  } from '../../providers/autocomplete-localidad/autocomplete-localidad';
import { PacienteServiceProvider } from '../../providers/paciente-service/paciente-service';
import { Subscription  } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { DniValidator } from '../../validators/dni.validator';

/**
 * Generated class for the ViewPacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-view-paciente',
  templateUrl: 'view-paciente.html',
})
export class ViewPacientePage {
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
  
  pacienteItem={} as PacienteItem;
  pacienteItemSuscription:Subscription;


  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase
        ,public formBuilder: FormBuilder
        ,public autocompleteProvinciaProv: AutocompleteProvinciaProvider
        ,public autocompleteLocProv: AutocompleteLocalidadProvider
        ,public autocompleteObraSocial: AutocompleteObrasocialServiceProvider
        ,private pacienteService: PacienteServiceProvider
        ,private dniValidator: DniValidator) {
        this.pacienteItemSuscription = this.database.object('pacientes/'+navParams.get('pacienteId')).subscribe(data=>{
              //this.pacienteItem.$key = data.$key;
              /*this.pacienteItem.dni=data.dni;
              this.pacienteItem.apellido = data.apellido;
              this.pacienteItem.nombre = data.nombre;
              this.pacienteItem.apellido_nombre = data.apellido_nombre;
              this.pacienteItem.codigoPostal = data.codigoPostal;
              this.pacienteItem.domicilio = data.domicilio;
              this.pacienteItem.email = data.email;
              this.pacienteItem.telefono = data.telefono;
              this.pacienteItem.estadoCivil = data.estadoCivil;
              this.pacienteItem.sexo = data.sexo;
              this.pacienteItem.fechaNacimiento = data.fechaNacimiento;
              if(data.provincia!=undefined){                       
                this.pacienteItem.provincia=data.provincia[Object.keys(data.provincia).toString()];
                this.provinciaName=data.provincia[Object.keys(data.provincia).toString()].nombre_provincia;
                this.autocompleteLocProv.setProvinciaId(Object.keys(data.provincia).toString());
              }
              if(data.localidad!=undefined){
                this.pacienteItem.localidad=data.localidad[Object.keys(data.localidad).toString()];
                this.localidadName=data.localidad[Object.keys(data.localidad).toString()].localidad_nombre;
              }
              if(data.obraSocial!=undefined){
                this.pacienteItem.obraSocial=data.obraSocial[Object.keys(data.obraSocial).toString()];
                this.obraSocialName=data.obraSocial[Object.keys(data.obraSocial).toString()].nombre;
                
              }*/
              this.pacienteItem = data  
              if(this.pacienteItem.provincia!=undefined){                       
                this.provinciaName=data.provincia[Object.keys(data.provincia).toString()].nombre_provincia;
                this.autocompleteLocProv.setProvinciaId(Object.keys(data.provincia).toString());
              }
              if(this.pacienteItem.localidad!=undefined){
                this.localidadName=data.localidad[Object.keys(data.localidad).toString()].localidad_nombre;
              }
              if(this.pacienteItem.obraSocial!=undefined){
                this.obraSocialName=data.obraSocial[Object.keys(data.obraSocial).toString()].nombre;
              }              


        });
        //console.log(this.pacienteItem);


  }

  ionViewDidLoad() {
      if(this.pacienteItem.provincia!=undefined){                       
        this.provinciaSearchBar.setValue(this.provinciaName);
      }
      if(this.pacienteItem.localidad!=undefined){
        this.localidadSearchBar.setValue(this.localidadName);
      }
      if(this.pacienteItem.obraSocial!=undefined){
        this.obraSocialSearchBar.setValue(this.obraSocialName);
      }

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
              'email'     : [''],
              'sexo'   : [''],
              'estadoCivil'   : ['']
          });
    
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
            this.pacienteService.updatePaciente(this.pacienteItem,this.pacienteItem.$key);
            this.navCtrl.pop();
        }  

        ionViewWillLeave(){
            this.pacienteItemSuscription.unsubscribe();
        }


}
