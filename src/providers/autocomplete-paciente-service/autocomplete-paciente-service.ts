import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';


/*
  Generated class for the AutocompletePacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompletePacienteServiceProvider implements AutoCompleteService  {
  labelAttribute = "apellidoNombre";
  pacientes:any;
  pacientesList=[];
  constructor(private http:Http, private database: AngularFireDatabase ) {
     // this.pacientesList = this.database.list('pacientes');
       this.database.list('pacientes',{
            /*query:{
                startAt: keyword,
                endAt: keyword+'\uf8ff'
            }*/
          }
        ).subscribe(items=>{
          items.forEach(element => {
            this.pacientesList.push({
              apellidoNombre:element.apellido+' '+element.nombre,
              //$key: element.
            });
          });
        });  

  }

   getResults(keyword:string) {
    /*return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });*/

        /*while (this.pacientesList.length>0){
          this.pacientesList.pop();

        }*/
          
      return JSON.parse(JSON.stringify(this.pacientesList)).filter(item => item.apellidoNombre.toLowerCase().startsWith(keyword.toLowerCase()) );
      
      

  }

}
