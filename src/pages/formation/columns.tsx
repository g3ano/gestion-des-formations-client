import { Header } from '@/components/data-table/columns';
import { arrEquals, arrIncludeSomeNumber } from '@/lib/filter-fns';
import { Formation } from '@/pages/formation';
import { ColumnDef } from '@tanstack/react-table';
import { format, fromUnixTime } from 'date-fns';

const minSize = 175;
const maxSize = 500;

const columns: ColumnDef<Formation>[] = [
  {
    accessorKey: 'relationships.intitule.intitule',
    id: 'intitule',
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
    accessorKey: 'relationships.categorie.categorie',
    id: 'categorie',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'relationships.type.type',
    id: 'type',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'relationships.organisme.organisme',
    id: 'organisme',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'relationships.codeDomaine.codeDomaine',
    id: 'codeDomaine',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 150,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'attributes.structure',
    id: 'structure',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.codeFormation',
    id: 'codeFormation',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'attributes.mode',
    id: 'mode',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    cell: (row) => (
      <span className='uppercase'>{row.getValue() as string}</span>
    ),
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'attributes.lieu',
    id: 'lieu',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'relationships.domaine.domaine',
    id: 'domaine',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
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
    accessorKey: 'attributes.effectif',
    id: 'effectif',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'attributes.durree',
    id: 'durree',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'attributes.HJ',
    id: 'HJ',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.pedagogiques',
    id: 'pedagogiques',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 225,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.hebergementRestauration',
    id: 'hebergementRestauration',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 275,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.transport',
    id: 'transport',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.presalaire',
    id: 'presalaire',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.autresCharges',
    id: 'autresCharges',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 175,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    id: 'observation',
    accessorKey: 'attributes.observation',
    header: ({ column, table }) => {
      return <Header column={column} table={table} />;
    },
    minSize,
    maxSize,
    size: 400,
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
