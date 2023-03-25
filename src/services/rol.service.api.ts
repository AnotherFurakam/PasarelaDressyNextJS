import { Rol } from "@/interfaces/empelado-interfaces";
import ApiBase from "@/pages/api/PasarelaDressyApi";


const getAllRoles = async ():Promise<Rol[]> => {
  const {data } = await ApiBase.get('rol') 
  return data
}

const funcs = {
  getAllRoles
}

export default funcs;