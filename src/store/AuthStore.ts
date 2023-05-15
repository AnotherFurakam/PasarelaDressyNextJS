import { ILoginResponse } from "@/interfaces/login-interface";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface AuthStore {
  loginData: ILoginResponse | null
  setLoginData: (loginData: ILoginResponse) => void
  clearLoginData: () => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      loginData: null,
      setLoginData(loginData) {
        set(state => (
          {
            ...state,
            loginData
          }
        ))
      },
      clearLoginData() {
        set(state => (
          {
            ...state,
            loginData: null
          }
        ))
      }
    })
  )
)