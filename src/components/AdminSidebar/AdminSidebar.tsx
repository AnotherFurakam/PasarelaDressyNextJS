import React from 'react';
import SideLink from './SideLink';
import { BsFillDiagram3Fill, BsFillPeopleFill, BsFillTruckFrontFill } from 'react-icons/bs';
import { CgSize } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { CgAdidas } from 'react-icons/cg';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
export interface AdminSidebarProps { }

const AdminSidebar: React.FC<AdminSidebarProps> = () => {

	const {logout} = useAuth()
	const {push} = useRouter()

	const handleLogout = () => {
		logout()
		push("/admin/login")
	}

	return (
		<div className='bg-slate-900 w-76 py-5 flex-col gap-5 h-100 min-h-[900px]'>
			<div className='flex flex-col px-4 gap-5'>
				<SideLink customHref='/admin/dashboard' text='Dashboard'><RiDashboardFill size={20} className='my-auto text-white' /></SideLink>
				<SideLink customHref='/admin/empleados' text='Empleados'><BsFillPeopleFill size={20} className='my-auto text-white' /></SideLink>
				<SideLink customHref='/admin/asignacion' text='Asignaciones'><BsFillDiagram3Fill size={20} className='my-auto text-white' /></SideLink>
				<SideLink customHref='/admin/proveedor' text='Proveedores'><BsFillTruckFrontFill size={20} className='my-auto text-white' /></SideLink>
				<SideLink text='Tallas'><CgSize size={20} className='my-auto text-white' /></SideLink>
				<SideLink text='Marcas'><CgAdidas size={20} className='my-auto text-white' /></SideLink>
				<button className='text-white bg-red-500 p-2 rounded-md hover:bg-opacity-90' onClick={handleLogout}>Salir</button>
			</div>
		</div>
	);
};

export default AdminSidebar;
