import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, matchSearch, searchInValues, unique } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronsUpDown } from 'lucide-react';
import {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';

interface AutoCompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  data: (string | number)[];
  onChange: (name: string, value: string) => void;
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ name, value, onChange, data, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const searchResults = useMemo(() => {
      const uniqueData = unique(data) ?? [];
      const uniqueSortedData =
        typeof uniqueData[0] === 'number'
          ? uniqueData.sort((a, b) => +a - +b).map(String)
          : uniqueData.sort().map(String);
      return searchInValues(uniqueSortedData, String(value));
    }, [data, value]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='relative'>
            <Input
              ref={ref}
              name={name}
              value={value}
              onChange={(e) => {
                onChange(e.target.name, e.target.value);
                if (!open) {
                  setOpen(true);
                }
              }}
              {...props}
            />
            <Icon
              render={ChevronsUpDown}
              className='absolute right-0 top-1/2 mr-2 shrink-0 -translate-y-1/2 opacity-50'
              size='xs'
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          role='Auto Complete'
          className='px-0'
          style={{
            width: 'var(--radix-popover-trigger-width)',
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {searchResults.length ? (
            <SearchResultList
              name={String(name)}
              searchResults={searchResults}
              value={value}
              onChange={onChange}
              setOpen={setOpen}
            />
          ) : (
            <div
              className='px-3 py-2 hover:bg-accent hover:text-accent-foreground'
              onClick={() => setOpen(false)}
            >
              {value}
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);
AutoComplete.displayName = 'AutoComplete';

const SearchResultList = ({
  name,
  searchResults,
  value,
  onChange,
  setOpen,
}: {
  name: string;
  searchResults: string[];
  value: string | number | readonly string[] | undefined;
  onChange: (name: string, value: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const count = searchResults.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className='overflow-y-auto'
      style={{
        height: 225,
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
            >
              <div
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between px-3 py-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  {
                    'bg-accent text-accent-foreground':
                      value === searchResults[vr.index],
                  }
                )}
                onClick={() => {
                  onChange(name, searchResults[vr.index]);
                  setOpen(false);
                }}
              >
                <div className='flex-1 select-none text-sm'>
                  {matchSearch(searchResults[vr.index], String(value)) ? (
                    matchSearch(searchResults[vr.index], String(value))?.map(
                      (elem, index) => (
                        <span
                          key={elem + index}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
