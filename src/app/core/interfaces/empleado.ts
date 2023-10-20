export interface Empleado {
    primerApellido: string;
    segundoApellido: string;
    primerNombre: string;
    otrosNombres?: string;
    pais: string;
    numeroIdentificacion: string;
    fechaIngreso: Date;
    area_id: number;
    activo?: boolean;
    is_superuser?: boolean;
}

export interface EmpleadoCreate extends Empleado{
    password: string;
}

export interface EmpleadoInDB extends Empleado{
    id: number;
    correo: string;
    activo: boolean;
    is_superuser: boolean;
    created_at: Date;
    updated_at?: Date;
}
