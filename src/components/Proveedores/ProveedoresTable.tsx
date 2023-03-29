import { useFetchProveedores } from '@/hooks/useFetchProveedores';
import { FC, useEffect } from 'react';
import { ActionButtons, Table, Td, TdId, Th, Thead, TogleEnable } from '../Table';
import { Proveedor } from '@/interfaces/proveedor-interfaces';
import { MdEdit } from 'react-icons/md';
import { BsTrash3Fill } from 'react-icons/bs';
import { ImSpinner7 } from 'react-icons/im';

interface ProveedoresTableProps {
  setOpenModal: () => void
}

const ProveedoresTable: FC<ProveedoresTableProps> = ({ setOpenModal }) => {
  const { getProveedores, proveedores, isDeleting, selectProveedorById, removeProveedor } = useFetchProveedores()

  const handleEdit = (id_proveedor: string) => {
    setOpenModal()
    selectProveedorById(id_proveedor)
  }

  useEffect(() => {
    if (proveedores.data === null) getProveedores()
  }, [])

  return (
    <div className='overflow-auto h-[630px] border-b-2'>
      {
        proveedores?.data ?
          <Table>
            <Thead>
              <Th text='Nombre' />
              <Th text='Dirección' />
              <Th text='Teléfono' />
            </Thead>
            <tbody >
              {
                proveedores?.data
                  ?
                  proveedores.data.map((p: Proveedor) => (
                    <tr className='text-center' key={p.id_proveedor}>
                      <TdId textColor='text-green-700' text={p.nombre}/>
                      <Td text={p.direccion} twCss='w-[540px] max-w-[540px]' />
                      <Td text={p.telefono} twCss='w-[100px] max-w-[100px] ' />
                      <ActionButtons
                        twCss='w-[150px]'
                        Actions={
                          [
                            {
                              icon: <MdEdit />,
                              twColor: 'bg-yellow-400 hover:bg-yellow-500',
                              handleAction: () => handleEdit(p.id_proveedor),
                              disabled: isDeleting,
                            },
                            {
                              icon: <BsTrash3Fill />,
                              twColor: 'bg-red-400 hover:bg-red-500',
                              handleAction: () => removeProveedor(p.id_proveedor),
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
  );
}
export default ProveedoresTable;