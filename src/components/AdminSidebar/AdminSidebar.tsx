import React from 'react';
import SideLink from './SideLink';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBoxes } from 'react-icons/fa';
import { CgSize } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { CgAdidas } from 'react-icons/cg';
export interface AdminSidebarProps { }

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
	return (
		<div className='bg-slate-900 w-76 py-5 flex-col gap-5 h-screen'>
			<div className='flex flex-col px-4 gap-5'>
				<SideLink customHref='/admin' text='Dashboard'><RiDashboardFill size={20} className='my-auto text-white' /></SideLink>
				<SideLink customHref='/admin/empleados' text='Empleados'><BsFillPeopleFill size={20} className='my-auto text-white' /></SideLink>
				<SideLink text='Proveedores'><FaBoxes size={20} className='my-auto text-white' /></SideLink>
				<SideLink text='Tallas'><CgSize size={20} className='my-auto text-white' /></SideLink>
				<SideLink text='Marcas'><CgAdidas size={20} className='my-auto text-white' /></SideLink>
			</div>
		</div>
	);
};

export default AdminSidebar;
