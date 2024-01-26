import VisibilityOptionsList from '@/components/data-table/visibility-options-list';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Table } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

interface VisibilityOptionsProps<TData, _TValue> {
  table: Table<TData>;
}

function VisibilityOptions<TData, TValue>({
  table,
}: VisibilityOptionsProps<TData, TValue>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <Icon
            render={Eye}
            size='sm'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='h-full p-0'
      >
        <VisibilityOptionsList table={table} />
      </PopoverContent>
    </Popover>
  );
}

export default VisibilityOptions;
