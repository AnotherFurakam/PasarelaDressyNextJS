import { useFetchEmpleados } from '@/hooks/useFetchEmpleados';
import type { FC } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface PaginationProps {
  actualPage?: number
  totalPage?: number | null
  prevPage?: number | null
  nextPage?: number | null
}

const Pagination: FC<PaginationProps> = ({ actualPage, nextPage, prevPage, totalPage }) => {

  const { getEmpleados } = useFetchEmpleados()

  return (
    <div className='flex justify-end gap-3 my-auto min-h-[56px] pr-4'>
      <button className='my-auto text-3xl text-blue-800 cursor-pointer hover:scale-110 active:scale-100 disabled:hover:scale-100 disabled:opacity-50' disabled={prevPage ? false : true} onClick={() => prevPage && getEmpleados(prevPage)}>
        <AiFillCaretLeft/>
      </button>
      <div className='my-auto '>
        <p className='text-xl'>{`${actualPage ?? ''} de ${totalPage ?? '...'}`}</p>
      </div>
      <button className='my-auto text-3xl text-blue-800 cursor-pointer hover:scale-110 active:scale-100 disabled:hover:scale-100 disabled:opacity-50' disabled={nextPage ? false : true} onClick={() => nextPage && getEmpleados(nextPage)}>
        <AiFillCaretRight />
      </button>
    </div>
  );
}
export default Pagination;