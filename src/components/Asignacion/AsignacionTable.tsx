import { useAsignacionStore } from '@/store/AsignacionStore';
import { FC, useEffect } from 'react';
import { Table, Td, TdId, Th, Thead } from '../Table';
import { Asignacion } from '@/interfaces/asignacion-interface';
import { ImSpinner7 } from 'react-icons/im';
import useFetchAsignaciones from '@/hooks/useFetchAsignaciones';
import { useFetchRoles } from '@/hooks/useFetchRoles';

interface AsignacionTableProps { }

const AsignacionTable: FC<AsignacionTableProps> = ({ }) => {

  const { asignaciones, selectedAsignacion, getAsignaciones, removeAsignacionData } = useFetchAsignaciones()
  const { selectedRol } = useFetchRoles()


  useEffect(() => {
    if (selectedRol){
      removeAsignacionData()
      getAsignaciones(selectedRol.id_rol)
    }
  }, [selectedRol])

  return (
    <div className='overflow-auto h-[630px] border-b-2'>
      {
        asignaciones?.data ?
          <Table>
            <Thead>
              <Th text='Dni' />
              <Th text='Nombre' />
              <Th text='Rol' />
            </Thead>
            <tbody >
              {
                asignaciones?.data
                  ?
                  asignaciones.data.map((a: Asignacion) => (
                    <tr className='text-center' key={a.id_asignacion}>
                      <TdId twCss='w-[300px] max-w-[300px]' textColor='text-green-700' text={a.empleado.dni} />
                      <Td text={`${a.empleado.nombres} ${a.empleado.apellido_pat} ${a.empleado.apellido_mat}`} />
                      <Td text={a.rol.nombre} twCss='w-[300px] max-w-[300px]' />
                    </tr>
                  ))
                  :
                  <></>
              }
            </tbody>
          </Table>
          : <div className='flex h-full w-full'><ImSpinner7 className='m-auto text-slate-600 text-4xl animate-spin' /></div>
      }
    </div>
  );
}
export default AsignacionTable;