import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AngularFireDatabase} from 'angularfire2/database';



/*
  Generated class for the AutocompletePacienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompletePacienteServiceProvider implements AutoCompleteService  {
  labelAttribute = "apellidoNombre";
  pacientesList=[];

   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endScroll:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   lastKey: string='';
   queryable: boolean = true;


  constructor(private http:Http, private database: AngularFireDatabase ) {
            this.database.list('/pacientes' , {
                query: {
                    orderByChild: 'apellido_nombre',
                    limitToLast: 1
                }
            }).subscribe((data) => {
                // Found the last key
                data.forEach(element=>{ 
                    this.lastKey = element.$key;

                });
                if (data.length > 0) {
                    
                } else {
                    this.lastKey = '';
                }
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
