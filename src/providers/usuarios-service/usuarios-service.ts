import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {

  constructor(private database:AngularFireDatabase,private afAuth: AngularFireAuth) {
    
  }

  addUser(){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        
      
      //this.navCtrl.push(PerfilPage);

      }
    } catch (e) {
      console.error(e);
    }
  }

}
