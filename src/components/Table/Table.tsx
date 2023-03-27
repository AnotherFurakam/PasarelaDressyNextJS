import type { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode
  minWidth?: string
  maxWidth?: string
}

const Table: FC<TableProps> = ({ children, minWidth = '700px', maxWidth = '1280px' }) => {
  return (
    <table className={`w-full min-w-[${minWidth}] max-w-[${maxWidth}]`}>
      {
        children
      }
    </table>
  );
}
export default Table;