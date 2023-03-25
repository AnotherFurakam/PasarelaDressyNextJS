import { Empleado, EmpleadoForm, PaginationEmpleado } from "@/interfaces/empelado-interfaces"
import ApiBase from "../pages/api/PasarelaDressyApi"
import { AxiosResponse } from "axios";

const getAllEmpleados = async (page: number): Promise<PaginationEmpleado> => {
  const response: AxiosResponse<PaginationEmpleado> = await ApiBase.get(`empleado/paginate?pageNumber=${page}&pageSize=${13}`);
  return response.data
}

const createEmpleado = async (empleado: EmpleadoForm) => {
  const response: AxiosResponse<Empleado> = await ApiBase.post('empleado',empleado)
  return response
}

const updateEmpleado = async (empleado: EmpleadoForm, id_empleado: string) => {
  const response: AxiosResponse<Empleado> = await ApiBase.put(`empleado/${id_empleado}`, empleado)
  return response
}

const enableEmpleado = async (id_empleado: string) => {
  const response: AxiosResponse<Empleado> = await ApiBase.post(`empleado/enable/${id_empleado}`)
  return response
}

const disableEmpleado = async (id_empleado: string) => {
  const response: AxiosResponse<Empleado> = await ApiBase.post(`empleado/disable/${id_empleado}`)
  return response
}

const removeEmpleado = async (id_empleado: string) => {
  const response: AxiosResponse<Empleado> = await ApiBase.delete(`empleado/${id_empleado}`)
  return response
}

const exportFunc = {
  getAllEmpleados,
  createEmpleado,
  removeEmpleado,
  updateEmpleado,
  enableEmpleado,
  disableEmpleado
}

export default exportFunc