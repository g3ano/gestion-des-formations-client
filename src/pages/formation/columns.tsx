import { Header } from '@/components/data-table/columns';
import { arrEquals, arrIncludeSomeNumber } from '@/lib/utils';
import { Formation } from '@/pages/formation';
import { ColumnDef } from '@tanstack/react-table';

const minSize = 175;
const maxSize = 500;

const columns: ColumnDef<Formation>[] = [
  {
    accessorKey: 'id',
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
    accessorKey: 'intitule',
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
    accessorKey: 'categorie',
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
    accessorKey: 'type',
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
    accessorKey: 'organisme',
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
    accessorKey: 'code_domaine',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'structure',
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
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'code_formation',
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
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'mode',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    cell: (row) => (
      <span className='uppercase'>{row.getValue() as string}</span>
    ),
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals,
  },
  {
    accessorKey: 'lieu',
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
    accessorKey: 'domaine',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    cell: (row) => (
      <span className='uppercase'>{row.getValue() as string}</span>
    ),
    minSize,
    maxSize,
    size: 175,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'effectif',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'durree',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'h_j',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'pedagogiques',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'hebergement_restauration',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'transport',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'presalaire',
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
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'autres_charges',
    header: ({ column, table }) => {
      return (
        <Header
          column={column}
          table={table}
        />
      );
    },
    cell: ({ row }) => {
      const value: string = row.getValue('autres_charges');
      const formatted = parseFloat(value);

      return <span>{formatted}</span>;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber,
  },
  {
    accessorKey: 'observation',
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
    size: 400,
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
