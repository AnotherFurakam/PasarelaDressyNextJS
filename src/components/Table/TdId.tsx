import type { FC } from 'react';

interface TdIdProps {
  text: string
  textColor: string
}

const TdId: FC<TdIdProps> = ({ text, textColor }) => {
  return (
    <td className={`p-2 ${textColor} cursor-pointer hover:underline font-semibold`}>
      {
        text
      }
    </td>
  );
}
export default TdId;