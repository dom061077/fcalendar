
/*
interface Dic {
    [key: string]: Object[]
}

*/

export interface PacienteItem{
        $key : string;
        dni : string;
        apellido: string;
        nombre: string;
        fechaNacimiento: string;
        estadoCivil: string;
        domicilio : string;
        apellido_nombre : string;
        provincia:{[key:string]:{}};
        localidad:{[key:string]:{}};
        codigoPostal: string;
        telefono : string;
        sexo : string;
        obraSocial: {[key:string]:{}};
        email:string;
    }