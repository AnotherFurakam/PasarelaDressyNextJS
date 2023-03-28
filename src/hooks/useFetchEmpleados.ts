import { Empleado, EmpleadoForm, PaginationEmpleado } from "@/interfaces/empelado-interfaces";
import { empleadosService } from "@/services";
import { useEmpleadoStore } from "@/store";
import { AxiosError } from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { shallow } from "zustand/shallow";

export const useFetchEmpleados = () => {

  //* Zustand State
  const { empleados, selectedEmpleado, setEmpleados, addEmpleado, removeEmpleadoData, setSelectedEmpleado, removeSelectedEmpleado, updateEmpleado } = useEmpleadoStore((state) => state, shallow);

  //* isDeleting state
  const [isDeleting, setIsDeleting] = useState(false)

  //* customHook functions

  /**
   * Obtiene los empleados desde la API y los setea dentro del estado global de empleados  
   * @param numberPage number - número de la página a buscar
   */
  const getEmpleados = async (numberPage?: number) => {
    removeEmpleadoData()

    //* Si no se pasa el número como argumento se usa el valor inicial del estado
    await empleadosService.getAllEmpleados(numberPage ?? empleados.pageNumber)
      .then(res => {
        setEmpleados(res)
      }).catch((res: AxiosError<PaginationEmpleado>) => {
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
  const _addEmpleado = async (empelado: EmpleadoForm) => {
    await empleadosService.createEmpleado(empelado)
      .then((res) => {
        addEmpleado(res.data)
      })
      .catch((res: AxiosError<Empleado>) => {
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
  const _updateEmpleado = async (empleado: EmpleadoForm, id_empleado: string) => {
    await empleadosService.updateEmpleado(empleado, id_empleado)
      .then(res => {
        updateEmpleado(res.data)
      })
      .catch((res: AxiosError<Empleado>) => {
        if (res.response?.status === 400) {
          throw new Error(res.response?.data.message?.toString().replace(',', '<br>'));
        }
      })
  }

  /**
   * Habilita un empleado haciendo un petición post a la API, posteriormente actualiza los datos del empleado en el
   * estado global de empleados
   * @param id_empleado string -> Id del empleado a habilitar
   */
  const enableEmpleado = async (id_empleado: string) => {
    Swal.fire({
      icon: 'warning',
      text: '¿Desea habilitar al empleado?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await empleadosService.enableEmpleado(id_empleado)
          .then(res => {
            updateEmpleado(res.data)
          })
          .catch((err: AxiosError<Empleado>) => {
            if (err.response?.status === 400) {
              Swal.fire({
                icon: 'error',
                html: err.response?.data.message?.toString(),
              })
            }
          })
      }
    })
  }

  /**
    * Desabilita un empleado haciendo un petición post a la API, posteriormente actualiza los datos del empleado en el
    * estado global de empleados
    * @param id_empleado string -> Id del empleado a desabilitar
    */
  const disableEmpleado = async (id_empleado: string) => {
    Swal.fire({
      icon: 'warning',
      text: '¿Desea desabilitar al empleado?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,
      showConfirmButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await empleadosService.disableEmpleado(id_empleado)
          .then(res => {
            updateEmpleado(res.data)
          })
          .catch((err: AxiosError<Empleado>) => {
            if (err.response?.status === 400) {
              Swal.fire({
                icon: 'error',
                html: err.response?.data.message?.toString(),
              })
            }
          })
      }
    })
  }

  /**
   * Selecciona la información un empleado del estado global de empleados mediante su id. <br>
   * Posteriormente setea los datos en el estado global de selectedEmpleado.<br>
   ** Actualmente solo obtiene los datos del empleado mediante un filtrado realizado en el estado global de empleados. Sin embargo esto será cambiado cuando se necesite realizar una peticion post a la API para obtener mas datos que los mostrados en la tabla de empleados.
   * @param id_empleado string -> Id del empleado a obtener
   */
  const selectEmpleadoById = (id_empleado: string) => {
    const empleado = empleados?.data?.find((e) => e.id_empleado === id_empleado)
    if (empleado !== undefined) {
      setSelectedEmpleado(empleado)
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
  const _removeSelectedEmpleado = () => {
    removeSelectedEmpleado()
  }

  const _removeEmpleado = async (id_empleado: string) => {
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
        await empleadosService.removeEmpleado(id_empleado)
          .then(() => {
            removeEmpleadoData()
            getEmpleados()
            setIsDeleting(false)
          })
          .catch((err: AxiosError<Empleado>) => {
            Swal.fire({
              icon: 'error',
              text: err.response?.data.message?.toString()
            })
            setIsDeleting(false)
          })
      }
    })
  }

  return {
    getEmpleados,
    empleados,
    selectedEmpleado,
    isDeleting,
    addEmpleado: _addEmpleado,
    updateEmpleado: _updateEmpleado,
    removeEmpleado: _removeEmpleado,
    selectEmpleadoById,
    removeSelectedEmpleado: _removeSelectedEmpleado,
    enableEmpleado,
    disableEmpleado
  }
}
