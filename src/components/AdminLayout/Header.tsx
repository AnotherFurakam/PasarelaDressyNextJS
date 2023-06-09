import type { FC, ReactNode } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

interface HeaderProps {
  icon: ReactNode
  buttonText?: string
  headerText: string
  handleOpenModal?: () => void
  twColor: string
  children?: ReactNode
}

const Header: FC<HeaderProps> = ({ icon, buttonText, headerText, handleOpenModal, twColor, children }) => {
  return (
    <div className='h-auto flex flex-col'>
      <div className={`${twColor} p-4 flex justify-between`}>
        <div className='flex gap-3'>
          <div className='my-auto text-4xl text-white'>{icon}</div>
          <h1 className='text-4xl text-white font-semibold'>{headerText}</h1>
        </div>
        <div>
          {
            buttonText ?
              <div className='flex gap-3 h-full items-center'>
                <button type='button' className={`bg-gray-800 text-white p-3 lg:py-2 lg:px-4 rounded-md flex items-center gap-2 hover:bg-gray-900 active:bg-gray-800 active:scale-[0.99]`} onClick={handleOpenModal}>
                  <BsPlusCircleFill />
                  <p className='hidden lg:block'>
                    {
                      buttonText
                    }
                  </p>
                </button>
                {children}
              </div>
              : <></>
          }
        </div>
      </div>
    </div>
  );
}
export default Header;