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

function VisibilityOptionsList<TData>({ table }: { table: Table<TData> }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanHide()),
    [table.getAllColumns()]
  );
  const count = columns.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 33,
  });

  return (
    <div
      ref={parentRef}
      className='h-[300px] overflow-y-auto py-2'
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((vr) => (
          <div
            key={vr.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${vr.size}px`,
              transform: `translateY(${vr.start}px)`,
            }}
            className='absolute top-0 left-0 w-full'
          >
            {columns[vr.index].getCanHide() && (
              <div
                className='cursor-pointer hover:bg-accent pl-4 pr-2 py-1 flex items-center justify-between gap-1'
                onClick={() => {
                  columns[vr.index].toggleVisibility();
                }}
              >
                <p className='truncate flex-1 select-none text-sm'>
                  {capitalize(columns[vr.index]?.id)}
                </p>
                {columns[vr.index].getIsVisible() && (
                  <Icon
                    render={Check}
                    size='sm'
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
