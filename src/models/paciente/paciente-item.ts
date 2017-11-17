
export interface PacienteItem{
        $key : string;
        dni : string;
        apellido: string;
        nombre: string;
        fechaNacimiento: string;
        estadoCivil: string;
        domicilio : string;
        provincia: {$key:'',nombre:''};
        localidad: {$key:'',nombre:'',codigoPostal:''};
        codigoPostal: string;
        telefono : string;
        sexo : string;
        obraSocial: {$key:'',nombre:''};
        email:string;

    }