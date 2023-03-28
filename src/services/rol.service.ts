import { Rol } from "@/interfaces/empelado-interfaces";
import ApiBase from "@/pages/api/PasarelaDressyApi";
import { AxiosResponse } from "axios";


const getAllRoles = async ():Promise<Rol[]> => {
  const response:AxiosResponse<Rol[]> = await ApiBase.get('rol') 
  return response.data
}

const funcs = {
  getAllRoles
}

export default funcs;