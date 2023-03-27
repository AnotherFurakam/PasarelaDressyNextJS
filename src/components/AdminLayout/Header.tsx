import type { FC, ReactNode } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

interface HeaderProps {
  icon: ReactNode
  buttonText?: string
  headerText: string
  handleOpenModal?: () => void
  twColor: string
}

const Header: FC<HeaderProps> = ({ icon, buttonText, headerText, handleOpenModal, twColor }) => {
  return (
    <div className='h-auto flex flex-col'>
      <div className={`${twColor} p-4 flex justify-between`}>
        <div className='flex gap-3'>
          <div className='my-auto text-4xl text-white'>{icon}</div>
          <h1 className='text-4xl text-white font-semibold'>{headerText}</h1>
        </div>
        <div>
          {
            buttonText &&
            <button type='button' className={`bg-gray-800 text-white p-3 lg:p-2 rounded-md my-auto flex gap-2 hover:bg-gray-900 active:bg-gray-800 active:scale-[0.99]`} onClick={handleOpenModal}>
              <BsPlusCircleFill className='my-auto' />
              <p className='hidden lg:block'>
                {
                  buttonText
                }
              </p>
            </button>
          }
        </div>
      </div>
    </div>
  );
}
export default Header;