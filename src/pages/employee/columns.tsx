import { Header } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { arrEquals } from '@/lib/filter-fns';
import { Employee } from '@/pages/employee';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';

const minSize = 175;
const maxSize = 500;

const columns: ColumnDef<Employee>[] = [
  {
    id: 'expand',
    header: ({ table }) => (
      <Button
        variant='ghost'
        size='icon'
        onClick={() => table.toggleAllRowsExpanded()}
        className='cursor-pointer w-full h-full focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-0'
      >
        <Icon
          render={table.getIsSomeRowsExpanded() ? ChevronDown : ChevronRight}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <Button
        variant='ghost'
        size='icon'
        onClick={() => row.toggleExpanded()}
        className='cursor-pointer w-full h-full focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-0'
      >
        <Icon render={row.getIsExpanded() ? ChevronDown : ChevronRight} />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    enableGrouping: false,
    enableColumnFilter: false,
    size: 75,
  },
  {
    accessorKey: 'employee.matricule',
    id: 'matricule',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
    enableHiding: false,
  },
  {
    accessorKey: 'employee.nom',
    id: 'nom',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    enableHiding: false,
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'employee.prenom',
    id: 'prenom',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    enableHiding: false,
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'employee.localite',
    id: 'localite',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'employee.email',
    id: 'email',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 300,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'employee.direction',
    id: 'direction',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 150,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'employee.sexe',
    id: 'sexe',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'employee.csp',
    id: 'csp',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'employee.date_naissance',
    id: 'date_naissance',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'employee.lieu_naissance',
    id: 'lieu_naissance',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'employee.created_at',
    id: 'created_at',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    enableSorting: false,
    minSize,
    maxSize,
    size: 175,
    filterFn: 'arrIncludesSome',
  },
];

export default columns;
