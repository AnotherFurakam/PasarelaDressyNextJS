import type { FC, ReactNode } from 'react';

interface TheadProps {
  children: ReactNode
}

const Thead: FC<TheadProps> = ({ children }) => {
  return (
    <thead className='border-b-2'>
      <tr>
        {
          children
        }
      </tr>
    </thead>
  );
}
export default Thead;