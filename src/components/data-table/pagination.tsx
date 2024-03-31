import Icon from '@/components/ui/icon';
import {
  Pagination as DataTablePagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex w-1/2 items-center gap-4'>
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
          <span className='select-none'>Lignes sur </span>
          <span>{table.getFilteredRowModel().rows.length}</span>
          <span className='select-none'>sélectionnées</span>
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
