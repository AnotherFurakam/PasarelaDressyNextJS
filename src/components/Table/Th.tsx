import type { FC } from 'react';

interface ThProps {
  text: string
  twCss?: string
}

const Th: FC<ThProps> = ({ text, twCss }) => {
  return (
    <th className={`py-2 text-slate-600 font-semibold ${twCss ? `${twCss}` : ''}]`}>
      {
        text
      }
    </th>
  );
}
export default Th;