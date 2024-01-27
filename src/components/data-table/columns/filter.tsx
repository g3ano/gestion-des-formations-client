import { FilterContext } from '@/components/data-table/columns/filter-context-';
import FilterInput from '@/components/data-table/columns/filter-input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Column, Table } from '@tanstack/react-table';
import { Bird, ListFilter } from 'lucide-react';

interface FilterProps<TData> {
  table: Table<TData>;
  column: Column<TData, unknown>;
}

function Filter<TData>({ table, column }: FilterProps<TData>) {
  const { open, setOpen } = FilterContext();

  return (
    <Popover
      open={open[column.id]}
      onOpenChange={(open) =>
        setOpen((prev) => ({
          ...prev,
          [column.id]: open,
        }))
      }
    >
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='text-muted-foreground flex-shrink-0'
        >
          <Icon
            render={ListFilter}
            className={cn({
              'text-light-foreground': column.getIsFiltered(),
            })}
            size='sm'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='w-72'
      >
        <ScrollArea>
          <div className='p-0.5'>
            {!!column.id ? (
              <div>
                {column.getIsVisible() && column.getCanFilter() && (
                  <div key={column.id}>
                    {
                      <FilterInput
                        column={column}
                        table={table}
                      />
                    }
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div>Aucun filtre trouvé</div>
                <div>
                  <Bird />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
export default Filter;
