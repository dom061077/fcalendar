import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';


/*
  Generated class for the AutocompleteProvinciaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteProvinciaProvider {
  provinciaList=[];
  constructor( private database: AngularFireDatabase) {
       this.database.list('obrasocial',{
            /*query:{
                startAt: keyword,
                endAt: keyword+'\uf8ff'
            }*/
          }
        ).subscribe(items=>{
          items.forEach(element => {
            //console.log('Obra social: '+element.descripcion);
            this.provinciaList.push({
              nombre:element.nombre,
              $key: element.$key
            });
          });
        });  

  }

getResults(keyword:string) {
    return JSON.parse(JSON.stringify(this.provinciaList)).filter(item => item.nombre.toLowerCase().startsWith(keyword.toLowerCase()) );
}  

}
