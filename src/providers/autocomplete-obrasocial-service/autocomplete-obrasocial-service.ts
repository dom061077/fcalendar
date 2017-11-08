import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';



/*
  Generated class for the AutocompleteObrasocialServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteObrasocialServiceProvider implements AutoCompleteService  {
  labelAttribute = "descripcion";
  obrasocialList=[];
  constructor(private http:Http, private database: AngularFireDatabase ) {
     // this.pacientesList = this.database.list('pacientes');
       this.database.list('obras_sociales',{
            /*query:{
                startAt: keyword,
                endAt: keyword+'\uf8ff'
            }*/
          }
        ).subscribe(items=>{
          items.forEach(element => {
            //console.log('Obra social: '+element.descripcion);
            this.obrasocialList.push({
              descripcion:element.nombre,
              $key: element.$key
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
      console.log('evento: getResults');
      return JSON.parse(JSON.stringify(this.obrasocialList)).filter(item => item.descripcion.toLowerCase().indexOf(keyword.toLowerCase())>-1 );
      
      

  }

}
