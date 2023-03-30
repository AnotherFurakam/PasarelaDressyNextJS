import { Rol } from "@/interfaces/empelado-interfaces";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface EmpleadoStore {
  roles: Rol[] | null
  selectedRol: Rol | null
  setRoles: (roles: Rol[]) => void
  setSelectedRol: (rol: Rol) => void
}

export const useRolStore = create<EmpleadoStore>()(
  devtools(
    (set) => ({
      roles: null,
      selectedRol: null,
      setRoles(roles) {
        console.log(roles)
        set(state => (
          {
            ...state,
            roles
          }
        ))
      },
      setSelectedRol(rol) {
        console.log(rol)
        set(state => (
          {
            ...state,
            selectedRol: rol
          }
        ))
      },
    })
  )
)