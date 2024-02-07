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
    accessorKey: 'relationships.code_domaine.code_domaine',
    id: 'code_domaine',
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
    accessorKey: 'formation.code_formation',
    id: 'code_formation',
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
    accessorKey: 'formation.h_j',
    id: 'h_j',
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
    accessorKey: 'relationships.couts.pedagogiques',
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
    accessorKey: 'relationships.couts.hebergement_restauration',
    id: 'hebergement_restauration',
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
    accessorKey: 'relationships.couts.transport',
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
    accessorKey: 'relationships.couts.presalaire',
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
    accessorKey: 'relationships.couts.autres_charges',
    id: 'autres_charges',
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
    accessorKey: 'formation.created_at',
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
