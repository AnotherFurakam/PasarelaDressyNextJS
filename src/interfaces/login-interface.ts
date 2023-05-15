
export interface ILogin {
  correo: string
  contrasenia: string
}

export interface ILoginResponse {
  empleado: IEmpleadoLoginResponse
  token: string
}

interface IEmpleadoLoginResponse {
  id_empleado: string
  nombres: string
  apellido_pat: string
}