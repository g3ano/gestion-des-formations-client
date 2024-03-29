import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { capitalize } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, Eye } from 'lucide-react';
import { useMemo, useRef } from 'react';

interface VisibilityOptionsProps<TData> {
  table: Table<TData>;
}

function VisibilityOptions<TData>({ table }: VisibilityOptionsProps<TData>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <Icon render={Eye} size='sm' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='h-full p-0'>
        <VisibilityOptionsList table={table} />
      </PopoverContent>
    </Popover>
  );
}
export default VisibilityOptions;

function VisibilityOptionsList<TData>({
  table: { getAllColumns },
}: {
  table: Table<TData>;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columns = useMemo(
    () => getAllColumns().filter((column) => column.getCanHide()),
    [getAllColumns]
  );
  const count = columns.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 33,
  });

  return (
    <div ref={parentRef} className='h-[280px] overflow-y-auto py-2'>
      <div
        className='relative w-full'
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((vc) => {
          const column = columns[vc.index];
          return (
            <div
              key={column.id}
              style={{
                height: `${vc.size}px`,
                transform: `translateY(${vc.start}px)`,
              }}
              className='absolute left-0 top-0 w-full'
            >
              {column.getCanHide() && (
                <div
                  className='flex cursor-pointer items-center justify-between gap-1 py-1 pl-4 pr-2 hover:bg-accent hover:text-accent-foreground'
                  onClick={() => column.toggleVisibility()}
                >
                  <p className='flex-1 select-none truncate text-sm'>
                    {capitalize(column?.id)}
                  </p>
                  {column.getIsVisible() && <Icon render={Check} size='sm' />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
