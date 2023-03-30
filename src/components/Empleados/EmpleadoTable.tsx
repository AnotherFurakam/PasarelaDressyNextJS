import { useFetchEmpleados } from '@/hooks/useFetchEmpleados';
import { Empleado } from '@/interfaces/empelado-interfaces';
import { FC, useEffect } from 'react'
import { BsTrash3Fill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { ImSpinner7 } from 'react-icons/im';
import Table from '../Table/Table';
import Thead from '../Table/Thead';
import Th from '../Table/Th';
import TdId from '../Table/TdId';
import Td from '../Table/Td';
import TogleEnable from '../Table/TogleEnable';
import ActionButtons from '../Table/ActionButtons';

interface Props {
  setOpenModal: () => void
}

const EmpleadoTable: FC<Props> = ({ setOpenModal }) => {

  const { empleados, getEmpleados, removeEmpleado, isDeleting, selectEmpleadoById, enableEmpleado, disableEmpleado } = useFetchEmpleados()

  const handleEdit = (id_empleado: string) => {
    setOpenModal()
    selectEmpleadoById(id_empleado)
  }

  useEffect(() => {
    if (empleados?.data === null) getEmpleados()
  }, [])

  //TODO: Dividir tabla en componentes
  return (
    <div className='overflow-auto h-[630px] border-b-2'>
      {
        empleados?.data ?
          <Table>
            <Thead>
              <Th text='Dni' />
              <Th text='Nombres' />
              <Th text='Apellidos' />
              <Th text='Teléfono' />
              <Th text='Correo' />
              <Th text='Activo' />
              <Th text='' />
            </Thead>
            <tbody >
              {
                empleados?.data
                  ?
                  empleados.data.map((e: Empleado) => (
                    <tr className='text-center' key={e.id_empleado}>
                      <TdId textColor='text-blue-700' text={e.dni} />
                      <Td text={e.nombres} twCss='w-[280px] max-w-[280px]' />
                      <Td text={e.apellido_pat + ' ' + e.apellido_mat} twCss='w-[280px] max-w-[280px]' />
                      <Td text={e.numero_cel} twCss='w-[100px]' />
                      <Td text={e.correo} twCss='w-[200px] max-w-[200px]'/>
                      <TogleEnable
                        id={e.id_empleado}
                        value={e.activo}
                        enableFunction={enableEmpleado}
                        disableFunction={disableEmpleado}
                      />
                      <ActionButtons
                        Actions={
                          [
                            {
                              icon: <MdEdit />,
                              twColor: 'bg-yellow-400 hover:bg-yellow-500',
                              handleAction: () => handleEdit(e.id_empleado),
                              disabled: isDeleting
                            },
                            {
                              icon: <BsTrash3Fill />,
                              twColor: 'bg-red-400 hover:bg-red-500',
                              handleAction: () => removeEmpleado(e.id_empleado),
                              disabled: isDeleting
                            }
                          ]
                        }
                      />
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
  )
}

export default EmpleadoTable
