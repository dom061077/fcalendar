import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';


@Injectable()
export class SeguridadServiceProvider {
    rolUsuario:string;
    constructor(private database:AngularFireDatabase){
        this.rolUsuario = 'PROFESIONAL';
    }

    getRolUsuario(){
       return this.rolUsuario;     
    }

    setRolUsuario(rolParam:string){
        this.rolUsuario = rolParam;
    }

    agregarRoles(){
        this.database.list('roles').push({rolnombre:'profesional'});
        this.database.list('roles').push({rolnombre:'secretaria'});
        this.database.list('roles').push({rolnombre:'administrador'});
    }

}