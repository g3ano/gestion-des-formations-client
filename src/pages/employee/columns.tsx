import { Header } from '@/components/data-table/columns';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { arrEquals } from '@/lib/filter-fns';
import { Employee } from '@/pages/employee';
import { ColumnDef } from '@tanstack/react-table';
import { format, fromUnixTime } from 'date-fns';
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
        className='rounded-tf-lg h-full w-full cursor-pointer rounded-none focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-0'
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
        className='h-full w-full cursor-pointer rounded-none focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-0'
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
    accessorKey: 'attributes.matricule',
    id: 'matricule',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
    enableHiding: false,
  },
  {
    accessorKey: 'attributes.nom',
    id: 'nom',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    enableHiding: false,
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.prenom',
    id: 'prenom',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    enableHiding: false,
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.localite',
    id: 'localite',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'attributes.email',
    id: 'email',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 300,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.direction',
    id: 'direction',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 150,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.sexe',
    id: 'sexe',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'attributes.csp',
    id: 'csp',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'attributes.dateNaissance',
    id: 'dateNaissance',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    cell: (row) => {
      return (
        <span>{format(fromUnixTime(row.getValue() as number), 'dd-MM-y')}</span>
      );
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'attributes.lieuNaissance',
    id: 'lieuNaissance',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.createdAt',
    id: 'createdAt',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    cell: (row) => {
      return (
        <span>{format(fromUnixTime(row.getValue() as number), 'dd-MM-y')}</span>
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
