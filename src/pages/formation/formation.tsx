import { FilterContextProvider } from '@/components/data-table/columns/filter-context';
import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { DataTableContext } from '@/lib/contexts/data-table-context';
import { TableContext } from '@/lib/contexts/table-context';
import { getFormations } from '@/pages/formation';
import columns from '@/pages/formation/columns';
import DataTable from '@/pages/formation/data-table';
import { useQuery } from '@tanstack/react-query';
import { Columns, FilterX, MoreVertical, Rows } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Formations = () => {
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ['formations'],
    queryFn: getFormations,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Page
      title='Formations'
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center'>
            <Button asChild>
              <Link to='/formations/create'>
                <span>Nouveau Formation</span>
              </Link>
            </Button>
          </div>
          <FormationMenu />
        </div>
      }
    >
      <div className='h-full'>
        {isPending && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {isSuccess && (
          <FilterContextProvider>
            <DataTable
              data={data}
              columns={columns}
            />
          </FilterContextProvider>
        )}
      </div>
    </Page>
  );
};

const FormationMenu = () => {
  const {
    setToggleVisibilityMenu,
    setToggleRowPerPage,
    resetFilteringColumns,
  } = TableContext();
  const { columnFilters, setColumnFilters, setColumnVisibility } =
    DataTableContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
        >
          <Icon
            render={MoreVertical}
            size='sm'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-64'
      >
        <DropdownMenuItem
          onClick={() => {
            setColumnFilters([]);
            resetFilteringColumns();
          }}
          withIcon
          icon={FilterX}
          disabled={!columnFilters.length}
        >
          Supprimer tout filtres
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            withIcon
            icon={Columns}
          >
            Columns Visibility
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setColumnVisibility({})}>
              Afficher tous
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                columns.map((column: any) => {
                  if (
                    column.id === 'select' ||
                    column.accessorKey === 'intitule'
                  ) {
                    return;
                  }
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [column.accessorKey as string]: false,
                  }));
                });
              }}
            >
              Masquer tous
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setToggleVisibilityMenu((prev) => !prev)}
            >
              Ouvrir menu
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          onClick={() => setToggleRowPerPage((prev) => !prev)}
          withIcon
          icon={Rows}
        >
          Line par page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};