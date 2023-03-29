import type { FC } from 'react';

interface TdProps {
  text: string
  twCss?: string
}

const Td: FC<TdProps> = ({ text, twCss }) => {
  return (
    <td className={`p-2 ${twCss} text-gray-700 whitespace-nowrap truncate overflow-hidden'`}>
      {
        text
      }
    </td>
  );
}
export default Td;