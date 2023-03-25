// Generated by https://quicktype.io

export interface Empleado {
  id_empleado: string
  nombres: string
  apellido_pat: string
  apellido_mat: string
  dni: string
  numero_cel: string
  correo: string
  creado_el: string
  direccion: string
  activo: boolean
  roles: Asignacion[]
  message?: string[]
}

export interface PaginationEmpleado {
  data:       Empleado[] | null;
  pageNumber: number;
  pageSize:   number;
  totalPages: number | null;
  prevPage:   number | null;
  nextPage:   number | null;
}


export interface Asignacion {
  id_asignacion: string
  rol: Rol
}

export interface Rol {
  id_rol: string
  nombre: string
}

export interface EmpleadoForm {
  nombres: string
  apellido_pat: string
  apellido_mat: string
  dni: string
  numero_cel: string
  correo: string
  direccion: string
}