import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn, matchSearch, searchInValues, unique } from '@/lib/utils';
import {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface AutoCompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  data: (string | number)[];
  onChange: (name: string, value: string) => void;
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ name, value, onChange, data, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const searchResults = useMemo(() => {
      const uniqueData = unique(data);
      const uniqueSortedData =
        typeof uniqueData[0] === 'number'
          ? uniqueData.sort((a, b) => +a - +b).map(String)
          : uniqueData.sort().map(String);
      return searchInValues(uniqueSortedData, String(value));
    }, [value]);

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
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
              className='absolute top-1/2 right-0 -translate-y-1/2 mr-2 shrink-0 opacity-50'
              size='sm'
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          role='auto complete'
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
              className='hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-lg'
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
        className='w-full relative'
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        <div
          className='absolute top-0 left-0 w-full space-y-1'
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
                  'w-full cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-2 flex items-center justify-between focus:bg-accent focus:text-accent-foreground',
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
                  {!!matchSearch(searchResults[vr.index], String(value)) ? (
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
