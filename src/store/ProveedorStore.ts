import { PaginateProveedor, Proveedor } from "@/interfaces/proveedor-interfaces"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface ProveedorStore {
  proveedores: PaginateProveedor
  selectedProveedor: Proveedor | null
  setProveedores: (proveedores: PaginateProveedor) => void
  addProveedor: (proveedor: Proveedor) => void
  removeProveedorData: () => void
  updateProveedor: (proveedor: Proveedor) => void
  setSelectedProveedor: (proveedor: Proveedor) => void
  removeSelectedProveedor: () => void
}

export const useProveedorStore = create<ProveedorStore>()(
  devtools(
    (set) => ({
      proveedores: {
        data: null,
        nextPage: null,
        pageNumber: 1,
        pageSize: 1,
        prevPage: null,
        totalPages: 1
      },
      selectedProveedor: null,
      setProveedores: (proveedores: PaginateProveedor) => {
        set((state) => ({
          ...state,
          proveedores
        }))
      },
      addProveedor: (proveedor: Proveedor) =>
        set((state) => {
          if (state.proveedores.data !== null) {
            return {
              ...state,
              proveedores: {
                ...state.proveedores,
                data:  state.proveedores.data.length < 13 ? [...state.proveedores.data, proveedor] : state.proveedores.data,
              }
            }
          } else {
            return state
          }
        }),
      removeProveedorData: () => {
        set((state) => ({
          ...state,
          proveedores: {
            ...state.proveedores,
            data: null
          }
        }))
      },
      setSelectedProveedor: (proveedor: Proveedor) => {
        set((state) => ({
          ...state,
          selectedProveedor: proveedor
        }))
      },
      removeSelectedProveedor: () => {
        set((state) => ({
          ...state,
          selectedProveedor: null
        }))
      },
      updateProveedor: (proveedor: Proveedor) =>
        set((state) => (
          {
            ...state,
            proveedores: {
              ...state.proveedores,
              data: state.proveedores.data?.map((p) => p.id_proveedor === proveedor.id_proveedor ? proveedor : p) ?? null
            }
          }
        )),
    })
  )
)
