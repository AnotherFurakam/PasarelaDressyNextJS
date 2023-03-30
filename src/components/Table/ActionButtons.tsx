import type { FC, ReactNode } from 'react';

type ActionButton = {
  icon: ReactNode
  twColor: string
  handleAction: () => void
  disabled: boolean
}

interface ActionButtonsProps {
  Actions: ActionButton[]
  twCss?: string
}


const ActionButtons: FC<ActionButtonsProps> = ({ Actions, twCss }) => {
  return (
    <td className={`p-2 ${twCss}`}>
      <div className='flex gap-3 justify-center'>
        {
          Actions.map((action, index) => (
            <button className={
              `
              text-white 
              p-[6px] 
              my-auto 
              rounded-full 
              cursor-pointer 
              ${action.twColor}
              `
            }
              key={index}
              onClick={() => action.handleAction()}
              disabled={action.disabled}
            >
              {action.icon}
            </button>
          ))
        }
      </div>
    </td>
  );
}
export default ActionButtons;