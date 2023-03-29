import { PaginateProveedor, Proveedor, ProveedorForm } from "@/interfaces/proveedor-interfaces";
import { proveedorService } from "@/services";
import { useProveedorStore } from "@/store/ProveedorStore";
import { AxiosError } from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { shallow } from "zustand/shallow";

export const useFetchProveedores = () => {

  //* Zustand State
  const { proveedores, selectedProveedor, setProveedores, addProveedor, removeProveedorData, setSelectedProveedor, removeSelectedProveedor, updateProveedor } = useProveedorStore((state) => state, shallow);

  //* isDeleting state
  const [isDeleting, setIsDeleting] = useState(false)

  //* customHook functions

  /**
   * Obtiene los proveedores desde la API y los setea dentro del estado global de proveedor  
   * @param numberPage number - número de la página a buscar
   */
  const getProveedores = async (numberPage?: number) => {
    //* Si no se pasa el número como argumento se usa el valor inicial del estado
    await proveedorService.getAllProveedores(numberPage ?? proveedores.pageNumber)
      .then(res => {
        setProveedores(res)
      }).catch((res: AxiosError<PaginateProveedor>) => {
        if (res.code === 'ERR_NETWORK')
          Swal.fire({
            icon: 'error',
            text: 'Hubo un error al conectarse con el servidor'
          })
      });
  }

  /**
   * Agregra un empleado enviando los datos al servidor y posteriormente actualiza el estado de empleados
   * haciendo una petición get de la página actual (Esto con el fin de que si la tabla esta llena este no
   * agregue un empleado de más)
   * @param empelado EmpleadoForm -> Información del empleado a registrar
   * @param handleCloseModal  handelCloseModal -> función que cierra el modal del formulario de registro 
   */
  const _addProveedor = async (proveedor: ProveedorForm) => {
    await proveedorService.createProveedor(proveedor)
      .then((res) => {
        addProveedor(res.data)

        //* En case supere los 13 elementos, obtiene los datos para actualizar la paginación
        if (proveedores.data?.length === 13) {
          getProveedores()
        }
      })
      .catch((res: AxiosError<Proveedor>) => {
        if (res.response?.status === 400) {
          throw new Error(res.response?.data.message?.toString().replace('.,', '<br>'));
        }
      })
  }

  /**
   * Esta función actualiza los datos de un empleado haciendo una petición post a la API y posteriormente
   * actualizando la información del empleado en el estado global de empleados
   * @param empleado EmpleadoForm -> Información del empleado a actualizar
   * @param id_empleado  string -> Id del empleado a actualizar
   */
  const _updateProveedor = async (proveedor: ProveedorForm, id_proveedor: string) => {
    await proveedorService.updateProveedor(proveedor, id_proveedor)
      .then(res => {
        updateProveedor(res.data)
      })
      .catch((res: AxiosError<Proveedor>) => {
        if (res.response?.status === 400) {
          throw new Error(res.response?.data.message?.toString().replace(',', '<br>'));
        }
      })
  }

  /**
   * Selecciona la información un empleado del estado global de empleados mediante su id. <br>
   * Posteriormente setea los datos en el estado global de selectedEmpleado.<br>
   ** Actualmente solo obtiene los datos del empleado mediante un filtrado realizado en el estado global de empleados. Sin embargo esto será cambiado cuando se necesite realizar una peticion post a la API para obtener mas datos que los mostrados en la tabla de empleados.
   * @param id_empleado string -> Id del empleado a obtener
   */
  const selectProveedorById = (id_proveedor: string) => {
    const proveedor = proveedores?.data?.find((p) => p.id_proveedor === id_proveedor)
    if (proveedor !== undefined) {
      setSelectedProveedor(proveedor)
    } else {
      Swal.fire({
        icon: 'error',
        text: 'El empleado no fue encontrado'
      })
    }
  }

  /**
   * Remueve la información del estado de selectedEmpleado poniendo su valor en null
   */
  const _removeSelectedProveedor = () => {
    removeSelectedProveedor()
  }

  const _removeProveedor = async (id_proveedor: string) => {
    setIsDeleting(true)

    Swal.fire({
      icon: 'question',
      text: '¿Desea elminira el empleado?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await proveedorService.removeProveedor(id_proveedor)
          .then(() => {
            removeProveedorData()
            getProveedores()
            setIsDeleting(false)
          })
          .catch((err: AxiosError<Proveedor>) => {
            Swal.fire({
              icon: 'error',
              text: err.response?.data.message?.toString()
            })
            setIsDeleting(false)
          })
      }
      setIsDeleting(false)
    })
  }

  return {
    proveedores,
    isDeleting,
    selectedProveedor,
    removeProveedorData,
    getProveedores,
    addProveedor: _addProveedor,
    updateProveedor: _updateProveedor,
    selectProveedorById,
    removeSelectedProveedor: _removeSelectedProveedor,
    removeProveedor: _removeProveedor
  }
}