import { Empleado, EmpleadoForm, PaginationEmpleado, PaginationShortEmpleado } from "@/interfaces/empelado-interfaces"
import ApiBase from "../pages/api/PasarelaDressyApi"
import { AxiosRequestConfig, AxiosResponse } from "axios";

const config = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
}

const getAllEmpleados = async (page: number, token = ''): Promise<PaginationEmpleado> => {
  const response: AxiosResponse<PaginationEmpleado> = await ApiBase.get(`empleado/paginate?pageNumber=${page}&pageSize=${13}`, config(token));
  return response.data
}

const getAllEmpledosNotAssignedFromRol = async (page: number, id_rol: string, token = ''): Promise<PaginationShortEmpleado> => {
  const response: AxiosResponse<PaginationShortEmpleado> = await ApiBase.get(`empleado/paginate/no-asigned-rol/${id_rol}?pageNumber=${page}&pageSize=${10}`, config(token));
  return response.data
}

const createEmpleado = async (empleado: EmpleadoForm, token = '') => {
  const response: AxiosResponse<Empleado> = await ApiBase.post('empleado', empleado, config(token))
  return response
}

const updateEmpleado = async (empleado: EmpleadoForm, id_empleado: string, token = '') => {
  const response: AxiosResponse<Empleado> = await ApiBase.put(`empleado/${id_empleado}`, empleado, config(token))
  return response
}

const enableEmpleado = async (id_empleado: string, token = '') => {
  console.log(token)
  const response: AxiosResponse<Empleado> = await ApiBase.post(`empleado/enable/${id_empleado}`,null, config(token))
  return response
}

const disableEmpleado = async (id_empleado: string, token = '') => {
  const response: AxiosResponse<Empleado> = await ApiBase.post(`empleado/disable/${id_empleado}`,null, config(token))
  return response
}

const removeEmpleado = async (id_empleado: string, token = '') => {
  const response: AxiosResponse<Empleado> = await ApiBase.delete(`empleado/${id_empleado}`, config(token))
  return response
}

const exportFunc = {
  getAllEmpleados,
  getAllEmpledosNotAssignedFromRol,
  createEmpleado,
  removeEmpleado,
  updateEmpleado,
  enableEmpleado,
  disableEmpleado
}

export default exportFunc