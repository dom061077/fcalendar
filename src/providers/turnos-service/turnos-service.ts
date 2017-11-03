import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import * as moment from 'moment';

/*
  Generated class for the TurnosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TurnosServiceProvider {

  constructor(private database: AngularFireDatabase) {
    
  }

  moverTurno(key:string,startMoment:any,endMoment:any){
      var item: FirebaseObjectObservable<any>;
      item = this.database.object('turnos/'+key);
      item.update({
            start:startMoment.format(),
            end:endMoment.format()
      });

  }

}
