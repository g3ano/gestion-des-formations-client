import { Header } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { arrEquals } from '@/lib/utils';
import { Employee } from '@/pages/employees';
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
        className='cursor-pointer w-full h-full'
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
        className='cursor-pointer w-full h-full'
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
    accessorKey: 'matricule',
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
    accessorKey: 'nom',
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
    accessorKey: 'prenom',
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
    accessorKey: 'localite',
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
    filterFn: arrEquals,
  },
  {
    accessorKey: 'email',
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
    accessorKey: 'direction',
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
    accessorKey: 'sexe',
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
    filterFn: arrEquals,
  },
  {
    accessorKey: 'csp',
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
    filterFn: arrEquals,
  },
  {
    accessorKey: 'date_naissance',
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
    filterFn: arrEquals,
  },
  {
    accessorKey: 'lieu_naissance',
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
    accessorKey: 'created_at',
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
