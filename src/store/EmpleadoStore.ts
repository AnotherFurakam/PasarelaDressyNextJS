import { Empleado, PaginationEmpleado } from "@/interfaces/empelado-interfaces";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export interface EmpleadoStore {
  empleados: PaginationEmpleado
  selectedEmpleado: Empleado | null
  setEmpleados: (empleados: PaginationEmpleado) => void
  addEmpleado: (empleado: Empleado) => void
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
      addEmpleado: (empleado: Empleado) =>
        set((state) => {
          if (state.empleados.data !== null) {
            return {
              ...state,
              empleados: {
                ...state.empleados,
                data: state.empleados.data.length < 13 ? [...state.empleados.data, empleado] : state.empleados.data,
              }
            }
          } else {
            return state
          }
        }),
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