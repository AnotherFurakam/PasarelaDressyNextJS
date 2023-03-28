import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Rol } from '@/interfaces/empelado-interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

interface RolComboProps {
  roles: Rol[] | null
  selectRoleFunc: (id_rol: string) => void
}

const RolCombo: FC<RolComboProps> = ({ roles, selectRoleFunc }) => {

  const [comboText, setComboText] = useState<string>("Seleccionar...")
  const [openCombo, setOpenCombo] = useState<boolean>(false)

  const handleOpenCombo = () => setOpenCombo(true)

  const handleCloseCombo = (text: string) => {
    setComboText(text)
    setOpenCombo(false)
  }

  const togleViewCombo = () => setOpenCombo(!openCombo)

  const { ref } = useOutsideClick(() => setOpenCombo(false))

  return (
    <div className='h-full relative flex w-[200px]' ref={ref}>
      <button
        type='button'
        className='
          w-full
          flex items-center justify-between
          bg-emerald-500 
          text-gray-800
          rounded-md 
          px-3
          z-[2]
          truncate whitespace-nowrap overflow-hidden
        '
        onClick={togleViewCombo}
      >
        {comboText} <AiOutlineDown className='text-sm text-emerald-800' />
      </button>
      <AnimatePresence>
        {
          openCombo &&
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: 45, opacity: 1 }}
            transition={{ delay: .01, type: 'tween' }}
            exit={{ top: 0, opacity: 0, height: 0, transition: { delay: .01, ease: 'easeIn' } }}
            className='absolute bg-indigo-300 w-full rounded-md py-3 px-2 overflow-hidden h-auto'
          >
            <ul className='flex flex-col gap-2'>
              {
                roles ?
                  roles.map(r => <li key={r.id_rol} className='whitespace-nowrap truncate overflow-hidden hover:bg-indigo-400 py-1 px-2 cursor-default rounded-sm transition-all delay-250 text-gray-800 hover:text-white' onClick={() => { handleCloseCombo(r.nombre); selectRoleFunc(r.id_rol) }}>{r.nombre}</li>)
                  : <></>
              }
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
export default RolCombo;