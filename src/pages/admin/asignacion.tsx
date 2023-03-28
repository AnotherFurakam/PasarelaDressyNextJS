import Header from '@/components/AdminLayout/Header';
import { useFetchRoles } from '@/hooks/useFetchRoles';
import { AdminLayout } from '@/layouts/AdminLayout';
import dynamic from 'next/dynamic';
import { FC, useEffect } from 'react';
import { BsFillDiagram3Fill } from 'react-icons/bs';

const RolCombo = dynamic(import('@/components/Asignacion/RolCombo'))

interface asignacionProps { }

const Asignacion: FC<asignacionProps> = () => {

  const { roles, getAllRoles, selectRolById } = useFetchRoles()

  useEffect(() => {
    if (roles === null) getAllRoles()
  }, [])

  return (
    <AdminLayout>
      <Header icon={<BsFillDiagram3Fill />} headerText='Asignaciones' twColor='bg-indigo-600'>
        <RolCombo roles={roles} selectRoleFunc={selectRolById} />
      </Header>
    </AdminLayout>
  );
}
export default Asignacion;