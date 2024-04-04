import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ActionCreateContext, globalSearch } from '@/pages/action';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Dot,
  LucideIcon,
  NotebookText,
  Plus,
  Search,
  User2,
} from 'lucide-react';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

function ActionSearchForm() {
  const [_searchValue, _setSearchValue] = useState('');
  const { searchValue, setSearchValue, preview, setAction, setPreview } =
    ActionCreateContext();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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
    queryKey: ['search', searchValue],
    queryFn: ({ pageParam }) => {
      if (!searchValue.length) {
        return null;
      }
      return globalSearch({
        searchValue: searchValue,
        includes: ['formations', 'employees'],
        page: pageParam,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.pagination.page < lastPage.pagination.pages) {
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
        <div className='relative mb-4 w-full'>
          <span className='absolute right-0 top-1/2 -translate-x-full -translate-y-1/2'>
            <Icon render={Search} />
          </span>
          <Input
            value={_searchValue}
            onChange={(e) => _setSearchValue(e.target.value)}
            className='rounded-full p-6 pe-12'
            placeholder='Rechercher une formation ou un employee...'
            ref={searchInputRef}
          />
        </div>

        {searchValue.length ? (
          isSuccess ? (
            <h3 className='flex items-center gap-1 text-xl'>
              <p>Résultat de recherche pour</p>
              <p className='font-medium'>{searchValue}</p>
            </h3>
          ) : (
            <h3 className='mb-2 flex items-center gap-2 text-xl'>
              <p>Résultat de recherche pour</p>
              <p className='h-5 w-36 animate-pulse rounded-sm bg-muted'></p>
            </h3>
          )
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
            <ScrollArea className='rounded-lg'>
              <div
                className={cn('space-y-4', {
                  'mb-6 ': hasNextPage,
                })}
              >
                {data.pages.map((group, index) => (
                  <Fragment key={index}>
                    {group ? (
                      group.data.map((elem, index) =>
                        elem.type === 'formation' ? (
                          <FormationSearchResult
                            key={`${elem.attributes.id}${index}${elem.relationships.intitule.intitule}`}
                          >
                            <IconWrapper icon={NotebookText} />
                            <div>{elem.relationships.intitule.intitule}</div>
                          </FormationSearchResult>
                        ) : elem.type === 'employee' ? (
                          <EmployeeSearchResult
                            key={`${elem.attributes.id}${index}${elem.attributes.nom}`}
                          >
                            <IconWrapper icon={User2} />
                            <div className='flex items-center gap-2'>
                              <div className='flex items-center gap-1'>
                                <p>{elem.attributes.nom}</p>
                                <p>{elem.attributes.prenom}</p>
                              </div>
                              <Icon
                                render={Dot}
                                className='text-muted-foreground'
                              />
                              <span>{elem.attributes.matricule}</span>
                            </div>
                          </EmployeeSearchResult>
                        ) : null
                      )
                    ) : (
                      <div>Aucun data</div>
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
                  Voir plus
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

const IconWrapper = ({ icon }: { icon: LucideIcon }) => {
  return (
    <div className='flex size-11 items-center justify-center rounded-sm bg-accent shadow-inner'>
      <Icon render={icon} />
    </div>
  );
};

const SearchResultItem = ({ children }: { children: ReactNode }) => {
  return <div className='flex w-full items-center gap-4'>{children}</div>;
};

const SearchResultItemSkeleton = () => {
  return (
    <SearchResultItem>
      <div className='size-11 animate-pulse rounded-sm bg-muted'></div>
      <div className='h-5 w-full flex-1 animate-pulse rounded-lg bg-muted'></div>
    </SearchResultItem>
  );
};

const EmployeeSearchResult = ({ children }: { children: ReactNode }) => {
  return (
    <SearchResultItem>
      <div className='flex w-full items-center gap-4'>{children}</div>
      <div className='cursor-pointer rounded-sm bg-card p-0.5'>
        <Icon render={Plus} />
      </div>
    </SearchResultItem>
  );
};

const FormationSearchResult = ({ children }: { children: ReactNode }) => {
  return (
    <SearchResultItem>
      <div className='flex w-full items-center gap-4'>{children}</div>
      <div className='cursor-pointer rounded-sm bg-card p-0.5'>
        <Icon render={Plus} />
      </div>
    </SearchResultItem>
  );
};
