import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AutoCompleteService,AutoCompleteComponent } from 'ionic2-auto-complete';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';



/*
  Generated class for the AutocompleteProvinciaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteProvinciaProvider implements AutoCompleteService {
   labelAttribute = "nombre";
   items: FirebaseListObservable<any>
   showSpinner:boolean=false;
   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endScroll:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   lastKey: string='';
   queryable: boolean = true;
   infiniteScroll:any;

  provinciaList=[];
  constructor( private database: AngularFireDatabase) {
        console.log('Autocomlete provincia service constructor');
        this.database.list('provincias',{
            query:{
              orderByChild: 'nombre'
            }
          }
        ).subscribe(items=>{
          console.log('Subscribe provincia');
          items.forEach(element => {
            console.log('forEach sobre provincia');
            console.log('Provincia: '+element.nombre);
            this.provinciaList.push({
              nombre:element.nombre,
              $key: element.$key
            });
          });
        });  
        console.log('fin de constructor de autocomplete provincia');
        

  }

getResults(keyword:string) {
    /*  if(keyword){
        this.endat.next(keyword.toUpperCase()+'\uf8ff');
        this.startat.next(keyword.toUpperCase());
        this.showSpinner = true;
    }else{
        this.showSpinner = true;
        this.endat.next('\uf8ff');
        this.startat.next('');
    } */       
    
    return JSON.parse(JSON.stringify(this.provinciaList)).filter(item => item.nombre.toLowerCase().indexOf(keyword.toLowerCase())>-1 );    

}  

}
