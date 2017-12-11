import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserValidator{
    userRef : FirebaseListObservable<any[]>;
    userNameFilter:BehaviorSubject<string> = new BehaviorSubject<string>('');
    debouncer:any;
    pacientesList:any;
    subscriptor:any;

    constructor(public pacienteService:UsuariosServiceProvider
            ,private database: AngularFireDatabase){
                this.userRef = this.database.list('profiles',{
                    query:{
                        orderByChild:'email',
                        equalTo:this.userNameFilter
                        
                    }
                });
                
    }

    checkUserName(control: FormControl):any{
        clearTimeout(this.debouncer);
        
        return new Promise(resolve=>{
                /*this.debouncer = setTimeout(()=> {
                    const existe = this.pacienteService.existePaciente(control.value) ;
                    console.log('Desde el validaor consulta si existe el paciente');
                    if (existe)
                        console.log('resuelve con error');
                        
                        
                        
                    //}else
                    //    resolve(null);    
                    resolve({"paciente ya existe":true});
                        
                }, 2000);*/
                this.userNameFilter.next(control.value);
                this.debouncer = setTimeout(()=> {
                    
                    this.subscriptor = this.userRef.subscribe((data)=>{
                            if(data.length>0){
                                resolve({'userexists':true});
                            }
                            else{
                                resolve(null);
                            }
                                
                    });
                        
                }, 1000);
            
        
        });
        
    }
}