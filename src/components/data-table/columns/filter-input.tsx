import { FilterContext } from '@/components/data-table/columns/filter-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { cn, matchSearch, searchInValues } from '@/lib/utils';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Column, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  BoxSelect,
  MoreVertical,
  MousePointerSquareDashed,
  X,
} from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

interface FilterInputProps<TData, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

function FilterInput<TData, TValue>({
  column,
  table,
}: FilterInputProps<TData, TValue>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setOpen } = FilterContext();
  const [filterValues, setFilterValues] = useState<string[]>(
    (table.getColumn(column.id)?.getFilterValue() as string[]) || []
  );
  const [searchValue, setSearchValue] = useState('');

  const sortedUniqueValues: string[] = useMemo(() => {
    const typeofFirstValue = typeof table
      .getRowModel()
      .flatRows[0]?.getValue(column.id);
    const isNumericString = !isNaN(
      parseFloat(table.getRowModel().flatRows[0]?.getValue(column.id))
    );
    const isString = typeofFirstValue === 'string' && !isNumericString;
    const isNumber = typeofFirstValue === 'number' || isNumericString;

    const values: string[] = isString
      ? Array.from<string>(column.getFacetedUniqueValues().keys()).sort()
      : isNumber
        ? Array.from(column.getFacetedUniqueValues().keys())
            .sort((a, b) => a - b)
            .map(String)
        : [];

    return values.length
      ? filterValues.length
        ? [
            ...(isString
              ? filterValues.sort()
              : filterValues.sort((a, b) => +a - +b)),
            ...values.filter((value) => !filterValues.includes(value)),
          ]
        : values
      : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.getFacetedUniqueValues()]);

  const searchResults = useMemo(
    () => searchInValues(sortedUniqueValues, searchValue),
    [searchValue, sortedUniqueValues]
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const count = searchResults.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
  });

  const items = virtualizer.getVirtualItems();
  const handleCheckChange = (checked: CheckedState, searchResult: string) => {
    if (checked) {
      setFilterValues((prev) => [...prev, searchResult]);
    } else {
      setFilterValues((prev) => {
        const result = prev.filter(
          (filterValue) => filterValue !== searchResult
        );
        return [...result];
      });
    }
  };

  const handleSetColumnFilterValues = () => {
    if (filterValues.length) {
      column.setFilterValue(filterValues);
    } else {
      const columnFilters = table
        .getState()
        .columnFilters.filter((col) => col.id !== column.id);
      table.setColumnFilters(columnFilters);
    }

    setOpen((prev) => ({
      ...prev,
      [column.id]: false,
    }));
  };
  const handleSelectAllFilterValues = useCallback(() => {
    setFilterValues((prev) => [...prev, ...searchResults]);
  }, [searchResults]);
  const handleClearFilterValues = useCallback(() => {
    setFilterValues([]);
  }, []);

  return (
    <div className='space-y-4'>
      <div className='flex'>
        <div className='relative inline-block flex-1'>
          <Input
            ref={inputRef}
            name='searchValue'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus={true}
            placeholder={`Rechercher ${column.id.replace('_', ' ')}...`}
            className='bg-accent shadow-sm shadow-background/45'
          />
          <Button
            onClick={() => {
              setSearchValue('');
              inputRef.current?.focus();
            }}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground',
              {
                hidden: !searchValue,
              }
            )}
            size='icon'
            variant='ghost'
          >
            <Icon render={X} />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='ghost' className='ml-2'>
              <Icon render={MoreVertical} size='sm' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleSelectAllFilterValues}>
              <div className='flex items-center justify-center pr-2'>
                <Icon render={MousePointerSquareDashed} size='xs' />
              </div>
              Sélectionner Tout
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClearFilterValues}>
              <div className='flex items-center justify-center pr-2'>
                <Icon render={BoxSelect} size='xs' />
              </div>
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        ref={parentRef}
        className='overflow-y-auto'
        style={{
          height: 250,
          contain: 'strict',
        }}
      >
        <div
          className='relative w-full'
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          <div
            className='absolute left-0 top-0 w-full space-y-1'
            style={{
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map((vr) => (
              <div
                key={vr.key}
                data-index={vr.index}
                ref={virtualizer.measureElement}
                className='group rounded-sm hover:bg-accent hover:text-accent-foreground'
              >
                <label className='m-[2px] flex items-center gap-4 rounded-sm px-2 py-1 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring'>
                  <div className='flex-1 select-none'>
                    {matchSearch(searchResults[vr.index], searchValue) ? (
                      matchSearch(searchResults[vr.index], searchValue)?.map(
                        (elem) => (
                          <span
                            className='[&>b]:text-primary'
                            key={elem}
                            dangerouslySetInnerHTML={{
                              __html: elem,
                            }}
                          />
                        )
                      )
                    ) : (
                      <span>{searchResults[vr.index]}</span>
                    )}
                  </div>
                  <Checkbox
                    checked={filterValues.includes(searchResults[vr.index])}
                    onCheckedChange={(checked) =>
                      handleCheckChange(checked, searchResults[vr.index])
                    }
                    className={cn(
                      'border-none shadow-none hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-0 group-hover:text-accent-foreground',
                      'data-[state=checked]:bg-transparent data-[state=checked]:text-foreground'
                    )}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <Button
          variant='secondary'
          onClick={() =>
            setOpen((prev) => ({
              ...prev,
              [column.id]: false,
            }))
          }
        >
          Cancel
        </Button>
        <Button onClick={handleSetColumnFilterValues}>OK</Button>
      </div>
    </div>
  );
}

export default FilterInput;
