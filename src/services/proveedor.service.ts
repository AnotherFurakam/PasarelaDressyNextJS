import ApiBase from "../pages/api/PasarelaDressyApi"
import { AxiosResponse } from "axios";
import { PaginateProveedor, Proveedor, ProveedorForm } from "@/interfaces/proveedor-interfaces";

const getAllProveedores = async (page: number): Promise<PaginateProveedor> => {
  const response: AxiosResponse<PaginateProveedor> = await ApiBase.get(`proveedor/paginate?pageNumber=${page}&pageSize=${13}`);
  return response.data
}

const createProveedor = async (proveedor: ProveedorForm) => {
  const response: AxiosResponse<Proveedor> = await ApiBase.post('proveedor',proveedor)
  return response
}

const updateProveedor = async (proveedor: ProveedorForm, id_proveedor: string) => {
  const response: AxiosResponse<Proveedor> = await ApiBase.put(`proveedor/${id_proveedor}`, proveedor)
  return response
}

const removeProveedor = async (id_proveedor: string) => {
  const response: AxiosResponse<Proveedor> = await ApiBase.delete(`proveedor/${id_proveedor}`)
  return response
}

const exportFunc = {
  getAllProveedores,
  createProveedor,
  updateProveedor,
  removeProveedor
}

export default exportFunc