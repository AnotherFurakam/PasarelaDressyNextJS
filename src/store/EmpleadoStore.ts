import { Empleado, PaginationEmpleado } from "@/interfaces/empelado-interfaces";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface EmpleadoStore {
  empleados: PaginationEmpleado
  selectedEmpleado: Empleado | null
  setEmpleados: (empleados: PaginationEmpleado) => void
  removeEmpleadoData: () => void
  updateEmpleado: (empleado: Empleado) => void
  setSelectedEmpleado: (empleado: Empleado) => void
  removeSelectedEmpleado: () => void
}

export const useEmpleadoStore = create<EmpleadoStore>()(
  devtools(
    (set) => ({
      empleados: {
        data: null,
        nextPage: null,
        pageNumber: 1,
        pageSize: 1,
        prevPage: null,
        totalPages: null
      },
      selectedEmpleado: null,
      setEmpleados: (empleados: PaginationEmpleado) => {
        set((state) => ({
          ...state,
          empleados
        }))
      },
      removeEmpleadoData: () => {
        set((state) => ({
          ...state,
          empleados: {
            ...state.empleados,
            data: null
          }
        }))
      },
      setSelectedEmpleado: (empleado: Empleado) => {
        set((state) => ({
          ...state,
          selectedEmpleado: empleado
        }))
      },
      removeSelectedEmpleado: () => {
        set((state) => ({
          ...state,
          selectedEmpleado: null
        }))
      },
      updateEmpleado: (empleado: Empleado) =>
        set((state) => (
          {
            ...state,
            empleados: {
              ...state.empleados,
              data: state.empleados.data?.map((e) => e.id_empleado === empleado.id_empleado ? empleado : e) ?? null
            }
          }
        )),
    })
  )
)