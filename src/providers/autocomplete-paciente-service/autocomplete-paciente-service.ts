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
  

  constructor(private database: AngularFireDatabase ) {
     // this.pacientesList = this.database.list('pacientes');
  }

  async getResults(keyword:string) {
    /*return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
      .map(
        result =>
        {
          return result.json()
            .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
        });*/
        console.log('keyword: '+keyword);
      result:Query;
      result=this.database.database.ref('/pacientes').orderByChild('apellido')
        .startAt(keyword).endAt(keyword+'\uf8ff')
        .on('child_added',function(paciente){
            

        });
      
      return "";

  }

}
