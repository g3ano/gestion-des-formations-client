import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ActionCreateContext, globalSearch } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

function ActionSearchForm() {
  const [_searchValue, _setSearchValue] = useState('');
  const { searchValue, setSearchValue, preview } = ActionCreateContext();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  console.log('_searchValue: ', _searchValue);
  console.log('searchValue: ', searchValue);

  //debounce the input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchValue(_searchValue);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [_searchValue, setSearchValue]);

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['search', searchValue],
    queryFn: () => {
      if (!searchValue.length) {
        return null;
      }
      return globalSearch({
        searchValue: searchValue,
        includes: ['formations'],
      });
    },
  });

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className='h-full pt-8'>
      <div
        className={cn('mx-auto max-w-screen-lg space-y-4', {
          'max-w-full': preview.open,
        })}
      >
        <div className='w-full'>
          <Input
            value={_searchValue}
            onChange={(e) => _setSearchValue(e.target.value)}
            className='rounded-full p-6'
            placeholder='Rechercher une formation ou un employee...'
            ref={searchInputRef}
          />
        </div>

        <div>
          {isError && (
            <div>{error.response?.data.errors.message as string}</div>
          )}
          {isPending && <div>Loading...</div>}
          {isSuccess && data ? (
            <div>
              <div>
                {data.formations &&
                  data.formations.map(({ formation, relationships }) => (
                    <div key={formation.id}>
                      {relationships.intitule.intitule}
                    </div>
                  ))}
              </div>
              <div>
                {data.employees &&
                  data.employees.map(({ employee }) => (
                    <div key={employee.id}>
                      <span>{employee.nom}</span>
                      <span>{employee.prenom}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default ActionSearchForm;
