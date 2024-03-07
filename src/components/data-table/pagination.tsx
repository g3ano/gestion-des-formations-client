import Icon from '@/components/ui/icon';
import {
  Pagination as DataTablePagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import { resolvePageNumber } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DISPLAY_PAGES_NUM = 6;

function Pagination<TData>({ table }: { table: Table<TData> }) {
  const { pages, currentPage, firstPage, lastPage } = resolvePageNumber(
    table.getPageCount(),
    table.getState().pagination.pageIndex,
    DISPLAY_PAGES_NUM
  );

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='w-1/2 flex items-center gap-4'>
        <div className='flex items-center justify-center gap-1'>
          <span>Page</span>
          <span className='font-bold'>
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span>de</span>
          <span>{table.getPageCount()}</span>
        </div>
        <span>/</span>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>
            {table.getFilteredSelectedRowModel().rows.length}
          </span>
          <span>Lignes sur </span>
          <span>{table.getFilteredRowModel().rows.length}</span>
          <span>sélectionnées</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <DataTablePagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationButton
                size='icon'
                variant='ghost'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <Icon render={ChevronLeft} />
              </PaginationButton>
            </PaginationItem>
            {pages.map((page) => (
              <div
                key={page}
                className='flex items-center gap-1'
              >
                {page === lastPage && pages.length > 4 && (
                  <PaginationItem>
                    <PaginationEllipsis className='flex items-end' />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationButton
                    onClick={() => table.setPageIndex(page)}
                    isActive={page === currentPage}
                  >
                    {page + 1}
                  </PaginationButton>
                </PaginationItem>
                {page === firstPage && pages.length > 4 && (
                  <PaginationItem>
                    <PaginationEllipsis className='flex items-end' />
                  </PaginationItem>
                )}
              </div>
            ))}
            <PaginationItem>
              <PaginationButton
                size='icon'
                variant='ghost'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <Icon render={ChevronRight} />
              </PaginationButton>
            </PaginationItem>
          </PaginationContent>
        </DataTablePagination>
      </div>
    </div>
  );
}
export default Pagination;
