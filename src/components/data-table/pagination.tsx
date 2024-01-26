import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Table } from '@tanstack/react-table';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function Pagination<TData>({ table }: { table: Table<TData> }) {
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
        <div>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon render={ChevronFirst} />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon render={ChevronLeft} />
          </Button>

          <Button
            size='icon'
            variant='ghost'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon render={ChevronRight} />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Icon render={ChevronLast} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
