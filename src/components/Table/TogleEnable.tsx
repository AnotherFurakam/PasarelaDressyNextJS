import type { FC } from 'react';

interface TogleEnableProps {
  id: string
  enableFunction: (id: string) => Promise<void>
  disableFunction: (id: string) => Promise<void>
  value: boolean
}

const TogleEnable: FC<TogleEnableProps> = ({id, value, enableFunction, disableFunction}) => {
  return (
    <td className='w-20 p-2'>
      <span className={`text-white tracking-wider uppercase ${value ? 'bg-green-600' : 'bg-red-600'} rounded-lg w-fit p-2 mx-auto block hover:scale-150 transition-transform cursor-pointer active:scale-100`} onClick={() => !value ? enableFunction(id) : disableFunction(id)}></span>
    </td>
  );
}
export default TogleEnable;