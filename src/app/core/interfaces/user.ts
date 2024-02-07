export interface Empleado {
    email: string;
    names?: string;
    last_names?: string;
    identification?: string;
    age?: number;
}

export interface EmpleadoCreate extends Empleado {
    password: string;
}

export interface EmpleadoInDB extends Empleado {
    id: number;
    active: boolean;
    is_superuser: boolean;
    created_at: Date;
    updated_at?: Date;
}
