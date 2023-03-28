import { Asignacion, PaginationAsignacion } from "@/interfaces/asignacion-interface"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface ProveedorStore {
  asignaciones: PaginationAsignacion
  selectedProveedor: Asignacion | null
  setProveedores: (asignaciones: PaginationAsignacion) => void
  addProveedor: (asignacion: Asignacion) => void
  removeProveedorData: () => void
  updateProveedor: (asignacion: Asignacion) => void
  setSelectedProveedor: (asignacion: Asignacion) => void
  removeSelectedProveedor: () => void
}

export const useProveedorStore = create<ProveedorStore>()(
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
      selectedProveedor: null,
      setProveedores: (asignaciones: PaginationAsignacion) => {
        set((state) => ({
          ...state,
          asignaciones
        }))
      },
      addProveedor: (asignacion: Asignacion) =>
        set((state) => {
          if (state.asignaciones.data !== null) {
            return {
              ...state,
              asignaciones: {
                ...state.asignaciones,
                data:  state.asignaciones.data.length < 13 ? [...state.asignaciones.data, asignacion] : state.asignaciones.data,
              }
            }
          } else {
            return state
          }
        }),
      removeProveedorData: () => {
        set((state) => ({
          ...state,
          asignaciones: {
            ...state.asignaciones,
            data: null
          }
        }))
      },
      setSelectedProveedor: (asignacion: Asignacion) => {
        set((state) => ({
          ...state,
          selectedProveedor: asignacion
        }))
      },
      removeSelectedProveedor: () => {
        set((state) => ({
          ...state,
          selectedProveedor: null
        }))
      },
      updateProveedor: (asignacion: Asignacion) =>
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
