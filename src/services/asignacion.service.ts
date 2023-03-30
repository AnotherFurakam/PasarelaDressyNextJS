/* eslint-disable import/no-anonymous-default-export */
import { Asignacion, AsignacionForm, PaginationAsignacion } from "@/interfaces/asignacion-interface";
import ApiBase from "@/pages/api/PasarelaDressyApi";
import { AxiosResponse } from "axios";

const createAsignacion = async (asignacionForm: AsignacionForm) => {
  const response: AxiosResponse<Asignacion> = await ApiBase.post('asignacion', asignacionForm);
  return response.data
}

const getAllProveedores = async (page: number, id_role: string): Promise<PaginationAsignacion> => {
  const response: AxiosResponse<PaginationAsignacion> = await ApiBase.get(`asignacion/paginate/${id_role}?pageNumber=${page}&pageSize=${14}`);
  return response.data
}

export default {
  createAsignacion,
  getAllProveedores
}