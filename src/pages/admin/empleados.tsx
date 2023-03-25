import EmpleadoTable from '@/components/Empleados/EmpleadoTable';
import { AdminLayout } from '@/layouts/AdminLayout'
import { FC, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import { useFetchEmpleados } from '@/hooks/useFetchEmpleados';
import { Pagination } from '@/components/Pagination';


// Importando Modal como componente CSR
const Modal = dynamic(import('../../components/Modal/Modal'), { ssr: false });
const EmpleadoForm = dynamic(import('../../components/Empleados/EmpleadoForm'))

interface Props {
}

const Empleados: FC<Props> = () => {

  const { removeSelectedEmpleado, empleados } = useFetchEmpleados()

  //*Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    removeSelectedEmpleado()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <AdminLayout>
      <div className='h-full flex flex-col'>
        <div className='bg-blue-800 p-4 flex justify-between'>
          <div className='flex gap-3'>
            <BsFillPeopleFill className='my-auto text-4xl text-white' />
            <h1 className='text-4xl text-white font-semibold'>Empleados</h1>
          </div>
          <div>
            <button type='button' className={`bg-gray-800 text-white p-3 lg:p-2 rounded-md my-auto flex gap-2 hover:bg-gray-900 active:bg-gray-800 active:scale-[0.99]`} onClick={handleOpenModal}>
              <BsPlusCircleFill className='my-auto' />
              <p className='hidden lg:block'>
                Agregar empleado
              </p>
            </button>
          </div>
        </div>
        <EmpleadoTable setOpenModal={handleOpenModal} />
        <Pagination actualPage={empleados?.pageNumber} nextPage={empleados?.nextPage} prevPage={empleados?.prevPage} totalPage={empleados?.totalPages} />
      </div>
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal} title='Formulario de empleado'>
        <EmpleadoForm handleCloseModal={handleCloseModal} />
      </Modal>
    </AdminLayout>
  )
}

export default Empleados
