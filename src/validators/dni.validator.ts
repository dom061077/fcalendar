import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PacienteServiceProvider } from '../providers/paciente-service/paciente-service';

@Injectable()
export class DniValidator{
    debouncer:any;
    pacientesList:any;

    constructor(public pacienteService:PacienteServiceProvider){

    }

    checkDni(control: FormControl):any{
        clearTimeout(this.debouncer);
        return new Promise(resolve=>{
                this.debouncer = setTimeout(()=> {
                    const existe = this.pacienteService.existePaciente(control.value) ;
                    console.log('Desde el validaor consulta si existe el paciente');
                    if (existe){
                        console.log('resuelve con error');
                        resolve({"paciente ya existe":true});
                        
                        
                    }else
                        resolve(null);    
                        
                }, 2000);


        });
    }
}