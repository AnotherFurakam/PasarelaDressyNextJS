import type { FC } from 'react';

interface TdProps {
  text: string
  twWidth?: string
}

const Td: FC<TdProps> = ({ text, twWidth }) => {
  return (
    <td className={`p-2 ${twWidth} text-gray-700 whitespace-nowrap truncate overflow-hidden'`}>
      {
        text
      }
    </td>
  );
}
export default Td;