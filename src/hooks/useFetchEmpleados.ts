import { Empleado, EmpleadoForm, PaginationEmpleado } from "@/interfaces/empelado-interfaces";
import { empleadoService } from "@/services";
import { useEmpleadoStore } from "@/store";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { shallow } from "zustand/shallow";


export interface EmpleadosFetchHook {
  empleados: PaginationEmpleado | null
  selectedEmpleado: Empleado | null
  isDeleting: boolean
  getEmpleados: (number?: number) => Promise<void>
  addEmpleado: (empleado: EmpleadoForm, handleCloseModal: () => void) => Promise<void>
  updateEmpleado: (empleado: EmpleadoForm, id_empleado: string, handleCloseModal: () => void) => Promise<void>
  removeEmpleado: (id_empleado: string) => Promise<void>
  selectEmpleadoById: (id_empleado: string) => void
  removeSelectedEmpleado: () => void
  enableEmpleado: (id_empleado: string) => Promise<void>
  disableEmpleado: (id_empleado: string) => Promise<void>
}


export const useFetchEmpleados = (): EmpleadosFetchHook => {


  //* Zustand State
  const { empleados, selectedEmpleado, setEmpleados, removeEmpleadoData, setSelectedEmpleado, removeSelectedEmpleado, updateEmpleado } = useEmpleadoStore((state) => state, shallow);

  //* isDeleting state
  const [isDeleting, setIsDeleting] = useState(false)

  //* customHook functions

  const getEmpleados = async (number?: number) => {
    removeEmpleadoData()

    //* Si no se pasa el número como argumento se usa el valor inicial del estado
    await empleadoService.getAllEmpleados(number ?? empleados.pageNumber)
      .then(res => {

        setEmpleados(res)
      }).catch((res: AxiosError<PaginationEmpleado>) => {
        console.log(res)
      });

  }

  const _addEmpleado = async (empelado: EmpleadoForm, handleCloseModal: () => void) => {
    await empleadoService.createEmpleado(empelado)
      .then(res => {
        getEmpleados()
        Swal.fire({
          icon: 'success',
          text: 'Empleado registrado correctamente'
        })
        handleCloseModal()
      })
      .catch((res: AxiosError<Empleado>) => {
        if (res.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            html: res.response?.data.message?.toString().replace('.,', '<br>'),
          })
        }
      })
  }

  const _updateEmpleado = async (empleado: EmpleadoForm, id_empleado: string, handleCloseModal: () => void) => {
    await empleadoService.updateEmpleado(empleado, id_empleado)
      .then(res => {
        Swal.fire({
          icon: 'success',
          text: 'Empleado actualizado correctamente',
        })
        updateEmpleado(res.data)
        handleCloseModal()
      })
      .catch((res: AxiosError<Empleado>) => {
        if (res.response?.status === 400) {
          Swal.fire({
            icon: 'error',
            html: res.response?.data.message?.toString().replace(',', '<br>'),
          })
        }
      })
  }

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
        await empleadoService.enableEmpleado(id_empleado)
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
        await empleadoService.disableEmpleado(id_empleado)
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
        await empleadoService.removeEmpleado(id_empleado)
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

  useEffect(() => {
    if (empleados.data === null) getEmpleados()
  }, [])

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
