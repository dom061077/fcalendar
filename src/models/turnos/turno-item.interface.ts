export interface TurnoItem{
    $key : string;
    start: string;
    end: string;
    title: string;
    paciente:{
        $key: string;
        apellido: string;
        nombre: string;
        dni: string;
    }   
}