import useFetchAsignaciones from '@/hooks/useFetchAsignaciones';
import { useFetchRoles } from '@/hooks/useFetchRoles';
import { FC, useEffect } from 'react';
import { Pagination } from '../Pagination';
import { ImSpinner7 } from 'react-icons/im';
import { AiOutlineCheck } from 'react-icons/ai';
import Swal from 'sweetalert2';

interface AsignacionFromProps {
  handleCloseModal: () => void
}

const AsignacionFrom: FC<AsignacionFromProps> = ({ handleCloseModal }) => {

  const { createAsignacion, getUnasignedEmpleados, unasignedEmpleados, removeUnasignedEmpleadosData, isSending } = useFetchAsignaciones()
  const { selectedRol } = useFetchRoles()

  const getUnasignedEmpleadosFromPage = async (pageNumber: number) => {
    if (selectedRol) {
      getUnasignedEmpleados(selectedRol?.id_rol, pageNumber)
    }
  }

  const handleSubmit = async (id_empleado: string) => {
    if (selectedRol) {
      await createAsignacion({
        id_empleado,
        id_rol: selectedRol?.id_rol
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Asignación creada',
            showConfirmButton: false,
            timer: 1500
          })
          handleCloseModal()
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un rol'
      })
    }
  }

  useEffect(() => {
    if (unasignedEmpleados.data === null) {
      if (selectedRol) getUnasignedEmpleados(selectedRol.id_rol)
    }

    return (() => removeUnasignedEmpleadosData())
  }, []);

  return (
    <div className='flex flex-col gap-4 h-full'>
      <h1 className='text-slate-800 font-semibold text-2xl'>{`Asignado rol de ${selectedRol?.nombre}`}</h1>
      <ul className='
        bg-white h-[380px] p-3 flex flex-col gap-3 rounded-md overflow-auto
        scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-300
      '>
        {
          unasignedEmpleados.data ?
            unasignedEmpleados.data?.map((ue) => (
              <li
                key={ue.id_empleado}
                className='grid grid-cols-[80px_auto_40px] bg-gray-100 p-3 rounded-md items-center cursor-default'
              >
                <h1 className='text-indigo-600 font-semibold'>{ue.dni}</h1>
                <h2 className='text-slate-700'>{`${ue.nombres} ${ue.apellido_pat} ${ue.apellido_mat}`}</h2>
                <button
                  className='
                    bg-blue-500 hover:bg-blue-600 active:bg-blue-500 disabled:saturate-50
                    flex items-center justify-center 
                    p-2 
                    rounded-md 
                    text-white 
                  '
                  onClick={() => handleSubmit(ue.id_empleado)}
                  disabled={isSending}
                >
                  <AiOutlineCheck />
                </button>
              </li>
            ))
            : <div className='flex h-full w-full'><ImSpinner7 className='m-auto text-slate-600 text-4xl animate-spin' /></div>
        }
      </ul>
      <Pagination
        getFunction={getUnasignedEmpleadosFromPage}
        actualPage={unasignedEmpleados.pageNumber}
        nextPage={unasignedEmpleados.nextPage}
        prevPage={unasignedEmpleados.prevPage}
        totalPage={unasignedEmpleados.totalPages}
        removeDataFunction={removeUnasignedEmpleadosData}
        twCss='h-auto py-2'
      />
    </div>
  );
}
export default AsignacionFrom;