import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { ProfileItem } from '../../models/profile/profile-item.interface';
//import { User } from '../../models/user';
import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';


/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {

  constructor(private database:AngularFireDatabase,private afAuth: AngularFireAuth) {
    
  }

  async addUser(profileuser:ProfileUserItem){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        profileuser.user.email,
        profileuser.user.password
      );
      if (result) {
          this.database.object('profiles/${result.uid}').set(profileuser.profile);
      }
    } catch (e) {
      console.error(e);
    }
  }

}
