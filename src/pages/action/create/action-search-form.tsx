import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { capitalize, cn } from '@/lib/utils';
import {
  ActionCreateContext,
  SearchIncludesFilter,
  globalSearch,
} from '@/pages/action';
import EmployeeSearchResultItem from '@/pages/action/components/action-search-form-employee-list-item';
import FormationSearchResultItem from '@/pages/action/components/action-search-form-formation-list-item';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Bird, Filter, Search, X } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';

function ActionSearchForm() {
  const [_searchValue, _setSearchValue] = useState('');
  const { searchValue, setSearchValue, preview } = ActionCreateContext();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchOptions, setSearchOptions] = useState<SearchIncludesFilter[]>([
    {
      value: 'formations',
      checked: true,
    },
    {
      value: 'employees',
      checked: true,
    },
  ]);

  //debounce the input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (_searchValue) {
        setSearchValue(_searchValue);
      }
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [_searchValue, setSearchValue]);

  const {
    data,
    isSuccess,
    isPending,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', searchValue, searchOptions],
    queryFn: ({ pageParam }) => {
      if (!searchValue.length) {
        return null;
      }
      return globalSearch({
        searchValue: searchValue,
        includes: searchOptions,
        page: pageParam,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage &&
        lastPage.pagination &&
        lastPage.pagination.page < lastPage.pagination?.pages
      ) {
        return lastPage.pagination.page + 1;
      }
      return null;
    },
  });

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    _setSearchValue(searchValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full pt-8'>
      <div
        className={cn('mx-auto flex h-full max-w-screen-lg flex-col gap-4', {
          'max-w-full': preview.open,
        })}
      >
        <div className='mb-4 flex w-full items-center gap-2'>
          <div className='relative isolate flex-1'>
            <div className='absolute right-0 top-1/2 aspect-square h-full -translate-y-1/2 rounded-full'>
              {_searchValue ? (
                <Button
                  className='flex h-full w-full items-center justify-center rounded-full bg-transparent'
                  variant='default'
                  onClick={() => {
                    _setSearchValue('');
                    setSearchValue('');
                  }}
                >
                  <Icon render={X} />
                </Button>
              ) : (
                <div className='flex h-full w-full items-center justify-center rounded-full'>
                  <Icon render={Search} />
                </div>
              )}
            </div>
            <Input
              value={_searchValue}
              onChange={(e) => _setSearchValue(e.target.value)}
              className='rounded-full p-6 pe-12'
              placeholder='Rechercher une formation ou un employee...'
              ref={searchInputRef}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size='icon'
                className='aspect-square h-full w-auto rounded-full'
              >
                <Icon render={Filter} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-64'>
              {searchOptions.map((option, index) => (
                <DropdownMenuCheckboxItem
                  key={option.value + index}
                  checked={option.checked}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() =>
                    setSearchOptions((prev) =>
                      prev.map((currentOption) => {
                        if (currentOption.value === option.value) {
                          return {
                            ...currentOption,
                            checked: !option.checked,
                          };
                        }
                        return currentOption;
                      })
                    )
                  }
                >
                  {capitalize(option.value)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {searchValue.length ? (
          <h3 className='flex items-center gap-1 text-xl'>
            <p>Résultat de recherche pour</p>
            {isSuccess ? (
              <p className='font-medium'>{searchValue}</p>
            ) : (
              <p className='h-5 w-36 animate-pulse rounded-sm bg-muted'></p>
            )}
          </h3>
        ) : null}

        {isError && <div>{error.response?.data.errors.message as string}</div>}
        {isPending && (
          <div className='space-y-4'>
            <SearchResultItemSkeleton />
            <SearchResultItemSkeleton />
            <SearchResultItemSkeleton />
          </div>
        )}
        {isSuccess ? (
          data.pages.filter(Boolean).length ? (
            <ScrollArea className='h-full rounded-lg'>
              <div
                className={cn('space-y-px', {
                  'mb-6 ': hasNextPage,
                })}
              >
                {data.pages.map((group, index) => (
                  <Fragment key={index}>
                    {group?.data.length ? (
                      group.data.map((elem, index) =>
                        elem.type === 'formation' ? (
                          <FormationSearchResultItem
                            key={`${elem.attributes.id}${index}${elem.relationships.intitule.intitule}`}
                            formation={elem}
                          />
                        ) : elem.type === 'employee' ? (
                          <EmployeeSearchResultItem
                            key={`${elem.attributes.id}${index}${elem.attributes.nom}`}
                            employee={elem}
                          />
                        ) : null
                      )
                    ) : (
                      <div className='flex w-full justify-center pt-8'>
                        <div className='translate-y-full'>
                          <Icon
                            render={Bird}
                            className='-traslate-y-full size-40 opacity-5'
                          />
                        </div>
                      </div>
                    )}
                    {isFetchingNextPage && <SearchResultItemSkeleton />}
                  </Fragment>
                ))}
              </div>

              {hasNextPage && !isFetchingNextPage ? (
                <Button
                  variant='ghost'
                  className='w-full hover:bg-transparent'
                  onClick={() => !isFetching && void fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  Voir plus...
                </Button>
              ) : null}
            </ScrollArea>
          ) : null
        ) : null}
      </div>
    </div>
  );
}
export default ActionSearchForm;

const SearchResultItemSkeleton = () => {
  return (
    <div className='flex w-full items-center gap-4 rounded-lg px-3 py-2 pe-2'>
      <div className='size-11 animate-pulse rounded-sm bg-muted'></div>
      <div className='h-5 w-full flex-1 animate-pulse rounded-lg bg-muted'></div>
    </div>
  );
};
