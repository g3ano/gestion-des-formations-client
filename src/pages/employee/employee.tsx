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
import { TableContext } from '@/lib/contexts/table-context';
import {
  Employee,
  EmployeeDataTableContext,
  getEmployees,
} from '@/pages/employee';
import columns from '@/pages/employee/columns';
import DataTable from '@/pages/employee/data-table';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Columns, FilterX, Loader2, MoreVertical, Rows } from 'lucide-react';
import { Link } from 'react-router-dom';

function Employees() {
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  return (
    <Page
      title='Employées'
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center'>
            <Button asChild>
              <Link to='/employees/create'>
                <span>Nouveau Employée</span>
              </Link>
            </Button>
          </div>
          <EmployeeMenu />
        </div>
      }
    >
      {isPending && (
        <div className='flex items-center gap-2'>
          <Icon
            render={Loader2}
            size='sm'
            className='animate-spin'
          />
          <div>Loading...</div>
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
    </Page>
  );
}

export default Employees;

function EmployeeMenu() {
  const {
    setToggleVisibilityMenu,
    setToggleRowPerPage,
    resetFilteringColumns,
  } = TableContext();
  const { columnFilters, setColumnFilters, setColumnVisibility } =
    EmployeeDataTableContext();

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
          disabled={!columnFilters.length}
        >
          <div className='flex items-center justify-center pr-2'>
            <Icon
              render={FilterX}
              size='xs'
            />
          </div>
          Supprimer tout filtres
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className='flex items-center justify-center pr-2'>
              <Icon
                render={Columns}
                size='xs'
              />
            </div>
            Columns Visibility
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setColumnVisibility({})}>
              Afficher tous
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                columns.map((column: ColumnDef<Employee>) => {
                  if (
                    column.id === 'select' ||
                    column.id === 'expand' ||
                    column.id === 'matricule' ||
                    column.id === 'nom' ||
                    column.id === 'prenom'
                  ) {
                    return;
                  }
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [column.id as string]: false,
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
        <DropdownMenuItem onClick={() => setToggleRowPerPage((prev) => !prev)}>
          <div className='flex items-center justify-center pr-2'>
            <Icon
              render={Rows}
              size='xs'
            />
          </div>
          Line par page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
