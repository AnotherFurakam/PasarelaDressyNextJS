import type { FC } from 'react';

interface ThProps {
  text: string
  twWidth?: string
}

const Th: FC<ThProps> = ({ text, twWidth }) => {
  return (
    <th className={`py-2 text-slate-600 font-semibold ${twWidth ? `${twWidth}` : ''}]`}>
      {
        text
      }
    </th>
  );
}
export default Th;