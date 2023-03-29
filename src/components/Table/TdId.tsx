import type { FC } from 'react';

interface TdIdProps {
  text: string
  textColor: string
  twCss?: string
}

const TdId: FC<TdIdProps> = ({ text, textColor, twCss }) => {
  return (
    <td className={`p-2 ${textColor} cursor-pointer hover:underline font-semibold ${twCss}`}>
      {
        text
      }
    </td>
  );
}
export default TdId;