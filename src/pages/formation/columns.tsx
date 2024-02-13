import { Header } from '@/components/data-table/columns';
import { arrEquals, arrIncludeSomeNumber } from '@/lib/filter-fns';
import { Formation } from '@/pages/formation';
import { ColumnDef } from '@tanstack/react-table';

const minSize = 175;
const maxSize = 500;

const columns: ColumnDef<Formation>[] = [
  {
    accessorKey: 'relationships.intitule.intitule',
    id: 'intitule',
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
    accessorKey: 'relationships.categorie.categorie',
    id: 'categorie',
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
    accessorKey: 'relationships.type.type',
    id: 'type',
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
    accessorKey: 'relationships.organisme.organisme',
    id: 'organisme',
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
    accessorKey: 'relationships.codeDomaine.codeDomaine',
    id: 'codeDomaine',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'formation.structure',
    id: 'structure',
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
    accessorKey: 'formation.codeFormation',
    id: 'codeFormation',
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
    accessorKey: 'formation.mode',
    id: 'mode',
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
    filterFn: arrEquals(),
  },
  {
    accessorKey: 'formation.lieu',
    id: 'lieu',
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
    accessorKey: 'relationships.domaine.domaine',
    id: 'domaine',
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
    accessorKey: 'formation.effectif',
    id: 'effectif',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'formation.durree',
    id: 'durree',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'formation.HJ',
    id: 'HJ',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.pedagogiques',
    id: 'pedagogiques',
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
    size: 225,
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.hebergementRestauration',
    id: 'hebergementRestauration',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.transport',
    id: 'transport',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.presalaire',
    id: 'presalaire',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    accessorKey: 'relationships.cout.autresCharges',
    id: 'autresCharges',
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
    filterFn: arrIncludeSomeNumber(),
  },
  {
    id: 'observation',
    accessorKey: 'formation.observation',
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
    accessorKey: 'formation.createdAt',
    id: 'createdAt',
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
