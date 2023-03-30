import EmpleadoTable from '@/components/Empleados/EmpleadoTable';
import { AdminLayout } from '@/layouts/AdminLayout'
import { FC, useState } from 'react'
import dynamic from 'next/dynamic';
import { useFetchEmpleados } from '@/hooks/useFetchEmpleados';
import { Pagination } from '@/components/Pagination';
import Header from '@/components/AdminLayout/Header';
import { FaBoxes } from 'react-icons/fa';


// Importando Modal como componente CSR
const Modal = dynamic(import('../../components/Modal/Modal'), { ssr: false });
const EmpleadoForm = dynamic(import('../../components/Empleados/EmpleadoForm'))

interface Props {
}

const Empleados: FC<Props> = () => {

  const { removeSelectedEmpleado, empleados, getEmpleados, removeEmpleadoData } = useFetchEmpleados()

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
        <Header
          buttonText='empleado'
          headerText='Empleados'
          handleOpenModal={handleOpenModal}
          icon={<FaBoxes />}
          twColor='bg-blue-700'
        />
        <EmpleadoTable setOpenModal={handleOpenModal} />
        <Pagination actualPage={empleados?.pageNumber} nextPage={empleados?.nextPage} prevPage={empleados?.prevPage} totalPage={empleados?.totalPages} getFunction={getEmpleados} removeDataFunction={removeEmpleadoData} />
      </div>
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal} title='Formulario de empleado'>
        <EmpleadoForm handleCloseModal={handleCloseModal} />
      </Modal>
    </AdminLayout>
  )
}

export default Empleados
