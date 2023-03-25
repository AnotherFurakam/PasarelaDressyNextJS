import { useFetchEmpleados } from '@/hooks/useFetchEmpleados';
import { Empleado } from '@/interfaces/empelado-interfaces';
import { FC } from 'react'
import { BsTrash3Fill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { ImSpinner7 } from 'react-icons/im';

interface Props {
  setOpenModal: () => void
}

const EmpleadoTable: FC<Props> = ({ setOpenModal }) => {

  const { empleados, removeEmpleado, isDeleting, selectEmpleadoById, enableEmpleado, disableEmpleado } = useFetchEmpleados()

  const handleEdit = (id_empleado: string) => {
    setOpenModal()
    selectEmpleadoById(id_empleado)
  }

  return (
    <div className='overflow-auto h-[630px] border-b-2'>
      {
        empleados?.data ?
          <table className='w-full min-w-[700px] max-w-[1280px]'>
            <thead className='border-b-2'>
              <tr>
                <th className='py-2 text-slate-600 font-semibold w-[120px]'>Dni</th>
                <th className='py-2 text-slate-600 font-semibold max-w-[250px]'>Nombres</th>
                <th className='py-2 text-slate-600 font-semibold max-w-[250px]'>Apellidos</th>
                <th className='py-2 text-slate-600 font-semibold w-[150px] max-w-[150px]'>Teléfono</th>
                <th className='py-2 text-slate-600 font-semibold w-[200px] max-w-[200px]'>Correo</th>
                <th className='py-2 text-slate-600 font-semibold'>Activo</th>
                <th className='py-2 text-slate-600 font-semibold w-[100px]'>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {
                empleados?.data
                  ?
                  empleados.data.map((e: Empleado) => (
                    <tr className='text-center' key={e.id_empleado}>
                      <td className='p-2 text-blue-700 cursor-pointer hover:underline font-semibold'>{e.dni}</td>
                      <td className='p-2 w-60 text-gray-700 whitespace-nowrap truncate'>{e.nombres}</td>
                      <td className='p-2 w-60 text-gray-700 whitespace-nowrap truncate]'>{e.apellido_pat + ' ' + e.apellido_mat}</td>
                      <td className='p-2 text-gray-700 whitespace-nowrap truncate'>{e.numero_cel}</td>
                      <td className='p-2 text-gray-700 whitespace-nowrap truncate'>{e.correo}</td>
                      <td className='w-20 p-2'>
                        <span className={`text-white tracking-wider uppercase ${e.activo ? 'bg-green-600' : 'bg-red-600'} rounded-lg w-fit p-2 mx-auto block hover:scale-150 transition-transform cursor-pointer active:scale-100`} onClick={() => !e.activo ? enableEmpleado(e.id_empleado) : disableEmpleado(e.id_empleado)}></span>
                      </td>
                      <td className='p-2'>
                        <div className='flex gap-3 justify-center'>
                          <button className='text-white bg-yellow-400 p-[6px] my-auto rounded-full cursor-pointer hover:bg-yellow-500 active:bg-yellow-400'
                            onClick={() => handleEdit(e.id_empleado)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className='text-white bg-red-400 p-[6px] rounded-full cursor-pointer hover:bg-red-500 active:bg-red-400 my-auto disabled:bg-red-200 disabled:cursor-auto'
                            onClick={() => removeEmpleado(e.id_empleado)}
                            disabled={isDeleting}
                          >
                            <BsTrash3Fill />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  :
                  <></>
              }
            </tbody>
          </table>
          : <div className='flex h-full w-full'><ImSpinner7 className='m-auto text-slate-600 text-4xl animate-spin' /></div>
      }
    </div>
  )
}

export default EmpleadoTable
