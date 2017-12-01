import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacienteItem } from '../../models/paciente/paciente-item';
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
  formAdd: FormGroup;
  provinciaKey: any;
  localidad: any;
  provinciaName:string;
  localidadName:string;
  obraSocial: any;
  
  pacienteItem={} as PacienteItem;


  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase
        ,public formBuilder: FormBuilder
        ,private dniValidator: DniValidator) {
        this.database.object('pacientes/'+navParams.get('pacienteId')).subscribe(data=>{
              this.pacienteItem.dni=data.dni;
              this.pacienteItem.apellido = data.apellido;
              this.pacienteItem.nombre = data.nombre;
              this.pacienteItem.apellido_nombre = data.apellido_nombre;
              this.pacienteItem.codigoPostal = data.codigoPostal;
              this.pacienteItem.domicilio = data.domicilio;
              this.pacienteItem.email = data.email;
              this.pacienteItem.estadoCivil = data.estadoCivil;
              if(data.provincia!=undefined){                       
                this.pacienteItem=data.provincia[Object.keys(data.provincia).toString()];
                this.provinciaName=data.provincia[Object.keys(data.provincia).toString()];
              }
        });
        console.log(this.pacienteItem);


  }

  ionViewDidLoad() {
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
