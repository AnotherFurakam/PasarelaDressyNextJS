import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/layouts/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RiDashboardFill } from 'react-icons/ri';

const Dashboard = () => {

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

export default Dashboard