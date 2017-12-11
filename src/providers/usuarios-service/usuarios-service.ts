import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { ProfileItem } from '../../models/profile/profile-item.interface';
//import { User } from '../../models/user';
import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription  } from 'rxjs/Subscription';



/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {
  onCompleteGetUsers:any;
  subscriptionGetUserCount: Subscription;
  subscriptionGetUserItems: Subscription;
  limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
  startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  lastKey: string='';  
  queryable:boolean;

  constructor(private database:AngularFireDatabase,private afAuth: AngularFireAuth) {
        this.subscriptionGetUserCount =  this.database.list('',{
              query:{
                  orderByChild: 'apellido_nombre'
                  ,limitToLast: 1
                  ,startAt : this.startat
                  ,endAt : this.endat                     
              }
              }).subscribe(data=>{
                  data.forEach(element=>{ 
                      this.lastKey = element.$key;
                  });
                  if (data.length <= 0) {
                    this.lastKey = ''; 
                  }
              });
        this.subscriptionGetUserItems = this.database.list(''.{
            query:{

            }
        }).subscribe(data=>{
            if (data.length > 0) {
                // If the last key in the list equals the last key in the database
                if (data[data.length - 1].$key === this.lastKey) {
                    this.queryable = false;
                } else {
                    this.queryable = true;
                }
            }
            /*if (this.infiniteScroll)
                this.infiniteScroll.complete();
            this.showSpinner = false;       */
            this.onCompleteGetUsers();
        });

  }

    async addUser(profileuser:ProfileUserItem){
    //try {
      const result = await  this.afAuth.auth.createUserWithEmailAndPassword(
        profileuser.user.email,
        profileuser.user.password

      ).then(data=>{
        const idUsuario = data.uid;
        profileuser.profile.email = profileuser.user.email;
        profileuser.profile.apellido_nombre = profileuser.profile.apellido+' '+profileuser.profile.nombre;
        this.database.object('profiles/'+idUsuario).set(profileuser.profile);
          

      });
    //} catch (e) {
    //  throw 400;
    //}
    }

    getUsers(filter:string){

    }  


}
