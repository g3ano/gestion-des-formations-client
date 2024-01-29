import { Column, Table } from '@tanstack/react-table';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { TableContext } from '@/lib/contexts/table-context';
import { Filter } from '@/components/data-table/columns';
import { FilterContext } from '@/components/data-table/columns/filter-context';
import { DataTableContext } from '@/lib/contexts/data-table-context';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  EyeOff,
  FilterIcon,
  FilterX,
  ListMinus,
  ListPlus,
  UnfoldHorizontal,
} from 'lucide-react';

interface HeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

function Header<TData, TValue>({ column, table }: HeaderProps<TData, TValue>) {
  const { isFilteredColumn, removeFilteredColumn, addFilteredColumn } =
    TableContext();
  const { setOpen } = FilterContext();
  const { setColumnFilters } = DataTableContext();
  const handleColumnFilterDeletion = () => {
    removeFilteredColumn(column.id);
    setColumnFilters((prev) => {
      return prev.filter((columnFilter) => columnFilter.id !== column.id);
    });
  };
  const handleColumnFilterAddition = () => {
    addFilteredColumn(column.id);
    setOpen((prev) => ({
      ...prev,
      [column.id]: false,
    }));
  };

  return (
    <div className='w-full flex items-center justify-between my-1'>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <p className='h-full data-table-cell uppercase cursor-default select-none'>
            {column.id.replace('_', ' ')}
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem
            withIcon
            icon={ArrowDown}
            onClick={() => {
              column.toggleSorting(false);
            }}
            disabled={!column.getCanSort() || column.getIsSorted() === 'asc'}
          >
            Trier A to Z
          </ContextMenuItem>
          <ContextMenuItem
            withIcon
            icon={ArrowUp}
            onClick={() => {
              column.toggleSorting(true);
            }}
            disabled={!column.getCanSort() || column.getIsSorted() === 'desc'}
          >
            Trier Z to A
          </ContextMenuItem>
          <ContextMenuItem
            withIcon
            icon={ArrowUpDown}
            onClick={() => {
              column.clearSorting();
            }}
            disabled={!column.getIsSorted()}
          >
            Détirer
          </ContextMenuItem>
          <ContextMenuItem
            withIcon
            icon={UnfoldHorizontal}
            onClick={() => {
              column.resetSize();
            }}
            disabled={
              !table.getState().columnSizing[column.id] &&
              table.getState().columnSizing[column.id] !== 0
            }
          >
            Default size
          </ContextMenuItem>
          <ContextMenuSeparator />
          {isFilteredColumn(column.id) ? (
            <ContextMenuItem
              withIcon
              icon={FilterX}
              onClick={handleColumnFilterDeletion}
              disabled={!isFilteredColumn(column.id)}
            >
              Supprimer filtre
            </ContextMenuItem>
          ) : (
            <ContextMenuItem
              withIcon
              icon={FilterIcon}
              onClick={handleColumnFilterAddition}
              disabled={isFilteredColumn(column.id)}
            >
              Filtrer
            </ContextMenuItem>
          )}
          <ContextMenuSeparator />
          <ContextMenuItem
            withIcon
            icon={EyeOff}
            onClick={() => column.toggleVisibility(false)}
            disabled={!column.getCanHide()}
          >
            Masquer
          </ContextMenuItem>
          <ContextMenuItem
            withIcon
            icon={table.getIsAllPageRowsSelected() ? ListMinus : ListPlus}
            onClick={() => table.toggleAllPageRowsSelected()}
          >
            {table.getIsAllPageRowsSelected() ? (
              <span>Désélectionner tous</span>
            ) : (
              <span>Sélectionner tous</span>
            )}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isFilteredColumn(column.id) && (
        <Filter
          key={column.id}
          table={table}
          column={column}
        />
      )}
    </div>
  );
}

export default Header;
