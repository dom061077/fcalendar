import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

  //limit:BehaviorSubject<number> = new BehaviorSubject<number>(10); // import 'rxjs/BehaviorSubject';
  
  lastKey: string;
  queryable: boolean = true;
  limit:number=20;


  constructor(public navCtrl: NavController, public navParams: NavParams
          ,private database: AngularFireDatabase ) {

          this.items=this.database.list('/pacientes' , {
              query: {
                  orderByChild: 'apellido',
                  limitToLast: 1
              }
          });
          this.items.subscribe(data => {
              // Found the last key
              if (data.length > 0) {
                  data.forEach(element => {
                    this.lastKey = element.$key;
                  });
                  
              } else {
                  this.lastKey = '';
              }
              console.log('Ultimo key: '+this.lastKey);
          });

         this.items = this.database.list('/pacientes', {
                query: {
                    orderByChild: 'apellido',
                    limitToFirst: this.limit
                }
          });
          
          
          
          this.items.subscribe( (data) => {
              console.log('Pasando por el subscribe de la consulta');
              if (data.length > 0) {
                  // If the last key in the list equals the last key in the database
                  if (data[data.length - 1].$key === this.lastKey) {
                      this.queryable = false;
                  } else {
                      this.queryable = true;
                  }
              }
          });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesPage');
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      this.limit = this.limit + 10;
        
      //setTimeout(() => {
        if (this.queryable){
            this.items = this.database.list('/pacientes', {
                query: {
                    orderByChild: 'apellido',
                    limitToFirst: this.limit
                }
            });      
            console.log('Ingresando a infinite load. Limit: '+this.limit);
            resolve();
        }
        //}, 300);
    })
  }  

}
