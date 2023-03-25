import { AdminLayout } from '@/layouts/AdminLayout';
import { RiDashboardFill } from 'react-icons/ri';

const Admin = () => {
  return (
    <AdminLayout>
      <div className='bg-cyan-800 p-4 flex justify-between'>
        <div className='flex gap-3'>
          <RiDashboardFill className='my-auto text-4xl text-white' />
          <h1 className='text-4xl text-white font-semibold'>Dashboard</h1>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin