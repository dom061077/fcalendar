import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PacienteServiceProvider } from '../providers/paciente-service/paciente-service';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DniValidator{
    pacientesRef : FirebaseListObservable<any[]>;
    dniFilter:BehaviorSubject<string> = new BehaviorSubject<string>('');
    debouncer:any;
    pacientesList:any;
    subscriptor:any;

    constructor(public pacienteService:PacienteServiceProvider
            ,private database: AngularFireDatabase){
                this.pacientesRef = this.database.list('pacientes',{
                    query:{
                        orderByChild:'dni',
                        equalTo:this.dniFilter
                        
                    }
                });
                
    }

    checkDni(control: FormControl):any{
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
                this.dniFilter.next(control.value);
                console.log('consulta: '+control.value);
                this.debouncer = setTimeout(()=> {
                    
                    this.subscriptor = this.pacientesRef.subscribe((data)=>{
                        console.log('Consulta sobre dni, devuelve: '+data.length);
                            if(data.length>0){
                                resolve({'ya existe el dni':true});
                            }
                            else{
                                resolve(null);
                            }
                                
                    });
                        
                }, 1000);
            
        
        });
        
    }
}