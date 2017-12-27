import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';

/*
  Generated class for the ProfesionalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfesionalesProvider {

  constructor(private database:AngularFireDatabase) {

  }


  initInstitucion(){
    let profesionales = this.database.list('instituciones');
    profesionales.push({nombre:'IQONO'});
    profesionales.push({nombre:'ALIVIAR'});
  }

}
