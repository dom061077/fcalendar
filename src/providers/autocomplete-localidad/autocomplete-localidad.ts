import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AutoCompleteService} from 'ionic2-auto-complete';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';


/*
  Generated class for the AutocompleteLocalidadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteLocalidadProvider implements AutoCompleteService {
  labelAttribute = "apellidoNombre";
  localidadList=[];
  items: FirebaseListObservable<any>
  showSpinner:boolean=false;

   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endScroll:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   lastKey: string='';
   queryable: boolean = true;
   infiniteScroll:string;  

  constructor( private database: AngularFireDatabase) {

          console.log('fin de constructor de autocomplete provincia');

  }

  setProvinciaId(provinciaId:string){
      this.database.list('provincias_localidades/'+provinciaId+'/localidad').subscribe((item)=>{
          item.forEach(element=>{
              console.log('Agregando: '+element.key+' localidad nombre: '+element.localidad_nombre);
              this.localidadList.push({
                nombre:element.localidad_nombre,
                $key:element.$key
              });
          })
      });
      

  }
  getResults(keyword:string) {
      console.log('Cantidad de Localidades: '+this.localidadList.length); 
      return JSON.parse(JSON.stringify(this.localidadList)).filter(item => item.nombre.toLowerCase().startsWith(keyword.toLowerCase()) );    
      

  }  

}
