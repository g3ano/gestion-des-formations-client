import { FilterContextProvider } from '@/components/data-table/columns/filter-context-';
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
import { Formation, getFormations } from '@/pages/formations';
import columns from '@/pages/formations/columns';
import DataTable from '@/pages/formations/data-table';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { Columns, FilterX, MoreVertical, Plus, Rows } from 'lucide-react';

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
          <div>
            <Button className='gap-2 justify-between px-3 ps-2'>
              <Icon
                render={Plus}
                size='sm'
              />
              <span>Nouveau Formation</span>
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
  const { setColumnFilters, setColumnVisibility } = DataTableContext();

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
