import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AddPacientePage } from '../add-paciente/add-paciente';

/**
 * Generated class for the PacientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()

//https://thielcole.github.io/ionic2/2016/11/15/pagination-angularfire2.html

@Component({
  selector: 'page-pacientes',
  templateUrl: 'pacientes.html',
})
export class PacientesPage {
  items: FirebaseListObservable<any>


  showSpinner:boolean=false;
 
   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
   lastKey: string='';
   queryable: boolean = true;
   infiniteScroll:any;


  constructor(public navCtrl: NavController, public navParams: NavParams
          ,private database: AngularFireDatabase ) {


            
            // asyncronously find the last item in the list
            this.database.list('/pacientes' , {
                query: {
                    orderByChild: 'apellido_nombre'
                    ,limitToLast: 1
                    ,startAt : this.startat
                    ,endAt : this.endat                    
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
            
            this.items = this.database.list('/pacientes', {
                query: {
                    orderByChild: 'apellido_nombre'
                    ,limitToFirst: this.limit
                    ,startAt : this.startat
                    ,endAt : this.endat
                }
            });

            this.items.subscribe( (data) => {
                /*data.forEach(element=>{
                     if(element.provincia!=undefined){                       
                            console.log('Key de provincia: '+Object.keys(element.provincia));
                            console.log('Provincia: '+element.provincia[Object.keys(element.provincia).toString()].nombre);
                     }
                });*/
                if (data.length > 0) {
                    // If the last key in the list equals the last key in the database
                    if (data[data.length - 1].$key === this.lastKey) {
                        this.queryable = false;
                    } else {
                        this.queryable = true;
                    }
                }
                if (this.infiniteScroll)
                    this.infiniteScroll.complete();
                this.showSpinner = false;       
                console.log('Se TERMINO DE DESCARGAR EL LIST');
            });          
          
          
  }

  scrolled(infiniteScroll){
            this.infiniteScroll=infiniteScroll;
            if (this.queryable) {
                this.limit.next( this.limit.getValue() + 10);
            }else
                infiniteScroll.complete();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesPage');
    this.endat.next('\uf8ff');
            this.startat.next('');
            

  }


  onInput(event){
        if(event.target.value){
            this.endat.next(event.target.value.toUpperCase()+'\uf8ff');
            this.startat.next(event.target.value.toUpperCase());
            this.showSpinner = true;
        }else{
            this.showSpinner = true;
            this.endat.next('\uf8ff');
            this.startat.next('');
        }

        
        return true;
  }

  onCancel(event){
        console.log('onCancel event');
        this.showSpinner = true;
        return false;
  }

  onAdd(){
        this.navCtrl.push(AddPacientePage);      
  }

  onClickItem(item){
        console.log('Item seleccionado: '+item);
  }


}
