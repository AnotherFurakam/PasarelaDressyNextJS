import { Asignacion, AsignacionForm, PaginationAsignacion } from "@/interfaces/asignacion-interface";
import { empleadosService } from "@/services";
import asignacionService from "@/services/asignacion.service";
import { useAsignacionStore } from "@/store/AsignacionStore";
import { AxiosError } from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { shallow } from "zustand/shallow";


const useFetchAsignaciones = () => {

  const [isSending, setIsSending] = useState<boolean>(false);

  const { asignaciones, selectedAsignacion, unasignedEmpleados, addAsignacion, setAsignaciones, setUnasignedEmpleados, removeAsignacionData, removeUnasignedEmpleadosData } = useAsignacionStore((state) => state, shallow);

  const createAsignacion = async (asignacionForm: AsignacionForm) => {
    setIsSending(true)
    await asignacionService.createAsignacion(asignacionForm)
      .then(res => {
        addAsignacion(res)
        setIsSending(false)

        //* En case supere los 13 elementos, obtiene los datos para actualizar la paginación
        if (asignaciones.data?.length === 14) {
          getAsignaciones(asignacionForm.id_rol)
        }
      })
      .catch((res: AxiosError<Asignacion>) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.response?.data.message
        })
        setIsSending(false)
      })
  }

  /**
     * Obtiene los proveedores desde la API y los setea dentro del estado global de proveedor  
     * @param numberPage number - número de la página a buscar
     */
  const getAsignaciones = async (id_role: string, numberPage?: number) => {
    //* Si no se pasa el número como argumento se usa el valor inicial del estado
    await asignacionService.getAllProveedores(numberPage ?? asignaciones.pageNumber, id_role)
      .then(res => {
        setAsignaciones(res)
      }).catch((res: AxiosError<PaginationAsignacion>) => {
        if (res.code === 'ERR_NETWORK')
          Swal.fire({
            icon: 'error',
            text: 'Hubo un error al conectarse con el servidor'
          })
      });
  }

  const getUnasignedEmpleados = async (id_rol: string, numberPage?: number) => {
    await empleadosService.getAllEmpledosNotAssignedFromRol(numberPage ?? unasignedEmpleados.pageNumber, id_rol)
      .then(res => {
        setUnasignedEmpleados(res)
      }).catch((res: AxiosError<PaginationAsignacion>) => {
        if (res.code === 'ERR_NETWORK')
          Swal.fire({
            icon: 'error',
            text: 'Hubo un error al conectarse con el servidor'
          })
      });
  }

  return {
    asignaciones,
    selectedAsignacion,
    unasignedEmpleados,
    isSending,
    getAsignaciones,
    removeAsignacionData,
    getUnasignedEmpleados,
    removeUnasignedEmpleadosData,
    createAsignacion
  };
}
export default useFetchAsignaciones;