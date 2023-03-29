import { Asignacion, PaginationAsignacion } from "@/interfaces/asignacion-interface"
import { PaginationShortEmpleado } from "@/interfaces/empelado-interfaces"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface AsignacionStore {
  asignaciones: PaginationAsignacion
  selectedAsignacion: Asignacion | null
  unasignedEmpleados: PaginationShortEmpleado
  setAsignaciones: (asignaciones: PaginationAsignacion) => void
  setUnasignedEmpleados: (empleados: PaginationShortEmpleado) => void
  addAsignacion: (asignacion: Asignacion) => void
  removeAsignacionData: () => void
  removeUnasignedEmpleadosData: () => void
  updateAsignacion: (asignacion: Asignacion) => void
  setSelectedAsignacion: (asignacion: Asignacion) => void
  removeSelectedAsignacion: () => void
}

export const useAsignacionStore = create<AsignacionStore>()(
  devtools(
    (set) => ({
      asignaciones: {
        data: null,
        nextPage: null,
        pageNumber: 1,
        pageSize: 1,
        prevPage: null,
        totalPages: 1
      },
      unasignedEmpleados: {
        data: null,
        nextPage: null,
        pageNumber: 1,
        pageSize: 1,
        prevPage: null,
        totalPages: 1
      },
      selectedAsignacion: null,
      setAsignaciones: (asignaciones: PaginationAsignacion) => {
        set((state) => ({
          ...state,
          asignaciones
        }))
      },
      setUnasignedEmpleados: (empleados: PaginationShortEmpleado) => {
        set((state) => ({
          ...state,
          unasignedEmpleados: empleados
        }))
      },
      addAsignacion: (asignacion: Asignacion) =>
        set((state) => {
          if (state.asignaciones.data !== null) {
            return {
              ...state,
              asignaciones: {
                ...state.asignaciones,
                data: state.asignaciones.data.length < 14 ? [...state.asignaciones.data, asignacion] : state.asignaciones.data,
              }
            }
          } else {
            return state
          }
        }),
      removeUnasignedEmpleadosData: () => {
        set((state) => ({
          ...state,
          unasignedEmpleados: {
            ...state.unasignedEmpleados,
            data: null,
            pageNumber: 1
          }
        }))
      },
      removeAsignacionData: () => {
        set((state) => ({
          ...state,
          asignaciones: {
            ...state.asignaciones,
            data: null
          }
        }))
      },
      setSelectedAsignacion: (asignacion: Asignacion) => {
        set((state) => ({
          ...state,
          selectedAsignacion: asignacion
        }))
      },
      removeSelectedAsignacion: () => {
        set((state) => ({
          ...state,
          selectedAsignacion: null
        }))
      },
      updateAsignacion: (asignacion: Asignacion) =>
        set((state) => (
          {
            ...state,
            asignaciones: {
              ...state.asignaciones,
              data: state.asignaciones.data?.map((a) => a.id_asignacion === asignacion.id_asignacion ? asignacion : a) ?? null
            }
          }
        )),
    })
  )
)
