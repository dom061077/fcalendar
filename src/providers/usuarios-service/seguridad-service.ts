import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { AccessPageItem } from '../../models/seguridad/accesspage-item';


@Injectable()
export class SeguridadServiceProvider {
    rolUsuario:string;
    pages = new Array() as Array<string>;
    constructor(private database:AngularFireDatabase){
        this.rolUsuario = 'PROFESIONAL';
    }

    getRolUsuario(){
       return this.rolUsuario;     
    }

    setRolUsuario(rolParam:string){
        this.rolUsuario = rolParam;
    }

    agregarRolesandPages(rolename:string,access_pages:Array<string>){
        let updateObject = {};
        const roles = this.database.list('roles');
        const access = this.database.list('accesspages');
        let rolAgregado = roles.push({
            role_name: rolename
        });
        const $rolKey = rolAgregado.key;
        const access_item = {} as AccessPageItem;
        let access_returned = {};
        access_pages.forEach(p=>{
            access_item.name = p;
            access_returned=access.push(access_item);
            const data = {[rolAgregado.key]:true};
            //const roles = this.database.object('accesspages/'+access_returned.key()+'/roles/');
            //roles.update(data);

        });


    }


}