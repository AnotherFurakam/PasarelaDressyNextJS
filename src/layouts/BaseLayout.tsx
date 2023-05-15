import { AdminNavbar } from '@/components/AdminNavbar';
import type { FC, ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex md:flex-row">
        <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr]">
          <AdminNavbar />
          <main className="flex w-full">
            <div className="bg-gray-300 w-full p-3 flex justify-center">
              <div className='w-full max-w-[1280px] overflow-hidden h-[806px] my-auto'>
                {
                  children
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default BaseLayout;