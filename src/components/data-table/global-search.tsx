import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(globalFilter || '');

  //debounce input
  useEffect(() => {
    const id = setTimeout(() => {
      setGlobalFilter(searchValue);
    }, 300);

    return () => clearTimeout(id);
  }, [searchValue]);

  return (
    <div className='relative w-full'>
      <Input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Rechercher quelque chose...'
        className='pr-8'
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
  );
}

export default GlobalFilter;
