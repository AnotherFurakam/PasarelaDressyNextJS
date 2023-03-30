import Header from '@/components/AdminLayout/Header';
import { Pagination } from '@/components/Pagination';
import ProveedorForm from '@/components/Proveedores/ProveedorForm';
import ProveedoresTable from '@/components/Proveedores/ProveedoresTable';
import { useFetchProveedores } from '@/hooks/useFetchProveedores';
import { AdminLayout } from '@/layouts/AdminLayout';
import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { FaBoxes } from 'react-icons/fa';


const Modal = dynamic(import('../../components/Modal/Modal'), { ssr: false });

interface proveedorProps { }


const Proveedor: FC<proveedorProps> = ({ }) => {

  const {getProveedores, proveedores, removeSelectedProveedor, removeProveedorData} = useFetchProveedores()

  //*Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    removeSelectedProveedor()
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <AdminLayout>
      <div className='h-full flex flex-col'>
        <Header
          buttonText='proveedor'
          headerText='Proveedores'
          handleOpenModal={handleOpenModal}
          icon={<FaBoxes />}
          twColor='bg-green-700'
        />
        <ProveedoresTable setOpenModal={handleOpenModal} />
        <Pagination getFunction={getProveedores} actualPage={proveedores.pageNumber} nextPage={proveedores.nextPage} prevPage={proveedores.prevPage} totalPage={proveedores.totalPages} removeDataFunction={removeProveedorData} />
      </div>
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal} title='Formulario de proveedor'>
        <ProveedorForm handleCloseModal={handleCloseModal}/>
      </Modal>
    </AdminLayout>
  );
}
export default Proveedor;