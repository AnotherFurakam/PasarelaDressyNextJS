import { ILoginResponse } from "@/interfaces/login-interface";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

export const useAuth = () => {

  const { loginData, setLoginData, clearLoginData } = useAuthStore((state) => state, shallow);

  const setLoginDataInLocalStorage = (loginResponse: ILoginResponse) => {
    localStorage.setItem('auth', JSON.stringify(loginResponse))
  }

  const getLoginDataFromLocalStorage = (): ILoginResponse | null => {
    const loginData: string | null = localStorage.getItem('auth')
    if (loginData) return JSON.parse(loginData);
    return null
  }

  const login = (loginData: ILoginResponse) => {
    setLoginData(loginData);
    setLoginDataInLocalStorage(loginData);
  }

  const logout = () => {
    clearLoginData();
    localStorage.removeItem("auth")
  }

  useEffect(() => {
    if (!loginData) {
      const data = getLoginDataFromLocalStorage()
      if (data) setLoginData(data);
    }
  }, [loginData])

  return {
    loginData,
    login,
    logout
  }
}