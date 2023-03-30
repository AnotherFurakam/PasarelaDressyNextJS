import Header from '@/components/AdminLayout/Header';
import AsignacionFrom from '@/components/Asignacion/AsignacionFrom';
import AsignacionTable from '@/components/Asignacion/AsignacionTable';
import { Pagination } from '@/components/Pagination';
import useFetchAsignaciones from '@/hooks/useFetchAsignaciones';
import { useFetchRoles } from '@/hooks/useFetchRoles';
import { AdminLayout } from '@/layouts/AdminLayout';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { BsFillDiagram3Fill } from 'react-icons/bs';

const RolCombo = dynamic(import('@/components/Asignacion/RolCombo'))
const Modal = dynamic(import('../../components/Modal/Modal'), { ssr: false });

interface asignacionProps { }

const Asignacion: FC<asignacionProps> = () => {


  const { roles, getAllRoles, selectedRol } = useFetchRoles()
  const { asignaciones, getAsignaciones, removeAsignacionData } = useFetchAsignaciones()

  //*Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    //removeSelectedEmpleado()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const getAsignacionesFromPage = async (pageNumber: number) => {
    if (selectedRol) {
      getAsignaciones(selectedRol?.id_rol, pageNumber)
    }
  }

  useEffect(() => {
    if (roles === null) getAllRoles()
  }, [])

  return (
    <AdminLayout>

      <div className='h-full flex flex-col'>
        <Header icon={<BsFillDiagram3Fill />} headerText='Asignaciones' twColor='bg-indigo-600' buttonText='Asignar' handleOpenModal={handleOpenModal}>
          <RolCombo />
        </Header>
        <AsignacionTable />
        <Pagination actualPage={asignaciones.pageNumber} nextPage={asignaciones.nextPage} prevPage={asignaciones.prevPage} totalPage={asignaciones.totalPages} getFunction={getAsignacionesFromPage} removeDataFunction={removeAsignacionData} />
      </div>
      <Modal handleClose={handleCloseModal} isOpen={isModalOpen} title='Empleados no asignados' >
        <AsignacionFrom handleCloseModal={handleCloseModal} />
      </Modal>
    </AdminLayout>
  );
}
export default Asignacion;