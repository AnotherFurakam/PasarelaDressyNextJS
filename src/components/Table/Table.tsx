import type { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode
  minWidth?: string
  maxWidth?: string
  twCss?: string
}

const Table: FC<TableProps> = ({ children, minWidth = '700px', maxWidth = '1280px', twCss }) => {
  return (
    <table className={`w-full min-w-[${minWidth}] max-w-[${maxWidth}] ${twCss}`}>
      {
        children
      }
    </table>
  );
}
export default Table;