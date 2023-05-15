import { ILogin, ILoginResponse } from "@/interfaces/login-interface";
import ApiBase from "@/pages/api/PasarelaDressyApi";
import { AxiosResponse } from "axios";

const login = async (loginDataForm: ILogin) => {
  const response: AxiosResponse<ILoginResponse> = await ApiBase.post("auth/login",loginDataForm);
  return response
}

const loginService = {
  login
}

export default loginService