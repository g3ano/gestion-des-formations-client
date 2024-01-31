import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Table } from '@tanstack/react-table';

function RowPerPage<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className='flex items-center gap-2'>
      <Select
        value={String(table.getState().pagination.pageSize)}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger>
                <SelectValue placeholder='100' />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent
              side='top'
              sideOffset={20}
            >
              Sélectionner combien de ligne par page
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SelectContent align='end'>
          {[25, 50, 100, 200, 500].map((item) => (
            <SelectItem
              key={item}
              value={String(item)}
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RowPerPage;
