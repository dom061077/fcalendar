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



 
   limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
   lastKey: string='';
   queryable: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams
          ,private database: AngularFireDatabase ) {


            
            // asyncronously find the last item in the list
            this.database.list('/pacientes' , {
                query: {
                    orderByChild: 'apellido',
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
            
            this.items = this.database.list('/pacientes', {
                query: {
                    orderByChild: 'apellido'
                    ,limitToFirst: this.limit
                }
            });
            
            this.items.subscribe( (data) => {
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

  scrolled(infiniteScroll){
        console.log('scrolling');
        //setTimeout(() => {
            if (this.queryable) {
                this.limit.next( this.limit.getValue() + 10);
            }
            infiniteScroll.complete();
        //}, 500);
        console.log('Fin de scrolling');            
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesPage');
  }


}
