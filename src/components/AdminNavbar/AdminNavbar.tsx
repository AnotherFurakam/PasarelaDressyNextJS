import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export interface AdminNavbarProps { }

const AdminNavbar: React.FC<AdminNavbarProps> = () => {

	const { loginData } = useAuth()

	return (
		<div className='bg-slate-900 flex justify-center px-3'>
			<nav className='bg-slate-900 w-full max-w-7xl py-3 flex justify-between align-middle'>
				<h1 className='text-4xl text-white'>Pasarela dressy</h1>
				{
					loginData ?
					<div className='flex gap-3 justify-center cursor-pointer active:bg-slate-800 rounded-sm p-2'>
						<p className='text-cyan-500 my-auto text-md'>{`${loginData?.empleado.nombres.split(" ")[0]} ${loginData?.empleado.apellido_pat}`}</p>
						<FaUserCircle size={30} className='text-white my-auto cursor' />
					</div>
					: <div></div>
				}
			</nav>
		</div>
	);
};

export default AdminNavbar;
