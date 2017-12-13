import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { ProfileItem } from '../../models/profile/profile-item.interface';
//import { User } from '../../models/user';
import { ProfileUserItem } from '../../models/profile/profile-user-item.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription  } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';



/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {
  subscriptionGetUserCount: Subscription;
  subscriptionGetUserItems: Subscription;
  completedQueryObs = new Subject();
  items: FirebaseListObservable<any>

  limit:BehaviorSubject<number> = new BehaviorSubject<number>(20); // import 'rxjs/BehaviorSubject';
  startat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  endat:BehaviorSubject<string> = new BehaviorSubject<string>('');
  lastKey: string='';  
  queryable:boolean;

  constructor(private database:AngularFireDatabase,private afAuth: AngularFireAuth) {
        this.subscriptionGetUserCount =  this.database.list('profiles',{
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
        this.items =   this.database.list('profiles',{
            query:{
                orderByChild: 'apellido_nombre'
                ,startAt : this.startat
                ,endAt : this.endat                     
            }
        });
        this.subscriptionGetUserItems = this.items.subscribe(data=>{
            if (data.length > 0) {
                // If the last key in the list equals the last key in the database
                if (data[data.length - 1].$key === this.lastKey) {
                    this.queryable = false;
                } else {
                    this.queryable = true;
                }
            }
            //if (this.infiniteScroll)
            //    this.infiniteScroll.complete();
            //this.showSpinner = false;       
            console.log('Consulta completa');
            this.completedQueryObs.next(true);
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
        console.log('Filtro: '+filter);
        this.endat.next(filter+'\uf8ff');
        this.startat.next(filter);
    }  

    changePassword(newPassword:string){
        this.afAuth.auth.currentUser.updatePassword(newPassword);

    }


    unsubscribeAll(){
        this.subscriptionGetUserCount.unsubscribe();
        this.subscriptionGetUserItems.unsubscribe();
    }




}
