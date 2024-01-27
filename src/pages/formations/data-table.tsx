import {
  ColumnDef,
  Row,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useMemo, useRef } from 'react';
import { Formation } from '@/pages/formations';
import { cn } from '@/lib/utils';
import GlobalFilter from '@/components/data-table/global-search';
import { DataTableContext } from '@/lib/contexts/data-table-context';
import VisibilityOptions from '@/components/data-table/visibility-options';
import Pagination from '@/components/data-table/pagination';
import Control from '@/components/data-table/rows/control';
import { TableContext } from '@/lib/contexts/table-context';
import RowPerPage from '@/components/data-table/rows/row-per-page';

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  data = [],
  columns,
}: DataTableProps<TData, TValue>) {
  const {
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    columnFilters,
    setColumnFilters,
    sorting,
    setSorting,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    columnSizing,
    setColumnSizing,
    columnSizingInfo,
    setColumnSizingInfo,
  } = DataTableContext();

  const { toggleVisibilityMenu, toggleRowPerPage } = TableContext();

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
      rowSelection,
      sorting,
      columnFilters,
      pagination,
      columnSizing,
      columnSizingInfo,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getRowId: (row: any) => row.id,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [columnSizing, columnVisibility]);

  return (
    <div
      className={cn('flex flex-col h-full gap-2 relative', {
        'cursor-w-resize': !!table.getState().columnSizingInfo.isResizingColumn,
      })}
    >
      <div className='mb-4 flex items-center flex-col md:flex-row md:justify-between'>
        <div className='w-full md:w-1/4'>
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div className='flex items-center gap-2'>
          {!!rowSelection && <Control table={table} />}
          {toggleRowPerPage && (
            <div className='duration-100 ease-in-out animate-in slide-in-from-bottom-10'>
              <RowPerPage table={table} />
            </div>
          )}
          {toggleVisibilityMenu && (
            <div className='duration-100 ease-in-out animate-in slide-in-from-bottom-10'>
              <VisibilityOptions table={table} />
            </div>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className='h-full relative overflow-auto rounded-lg'
      >
        <div
          role='table'
          className='grid'
          style={{
            ...columnSizeVars,
            width: table.getTotalSize(),
          }}
        >
          <div
            role='table head'
            className='grid sticky top-0 z-10 bg-background rounded-lg'
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                role='table row'
                key={headerGroup.id}
                className='w-full flex shadow rounded-lg pr-[2px]'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <div
                      role='table header'
                      key={header.id}
                      className='flex w-full mt-[1px] relative overflow-hidden'
                      style={{
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'w-1 cursor-w-resize h-full hover:bg-light absolute inset-y-0 right-0 transition duration-150 ease-in-out',
                            {
                              'bg-light w-9': header.column.getIsResizing(),
                            }
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {!!columnSizingInfo.isResizingColumn ? (
            <MemoizedTableBody
              table={table}
              containerRef={containerRef}
            />
          ) : (
            <TableBody
              table={table}
              containerRef={containerRef}
            />
          )}
        </div>
      </div>

      <div className='h-20 flex items-center w-full relative'>
        <Pagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;

function TableBody<TData>({
  table,
  containerRef,
}: {
  table: Table<TData>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 55,
    getScrollElement: () => containerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return !!virtualizer.getVirtualItems().length ? (
    <div
      role='table body'
      className={cn('grid relative', {
        'select-none': !!table.getState().columnSizingInfo.isResizingColumn,
      })}
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = table.getRowModel().rows[
          virtualRow.index
        ] as Row<Formation>;
        return (
          <div
            role='table row'
            data-index={virtualRow.index}
            ref={(node) => virtualizer.measureElement(node)}
            key={row.id}
            className='w-full flex absolute shadow rounded-lg'
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div
              className={cn(
                'flex mt-1 bg-background rounded-lg relative border border-background',
                {
                  'bg-light/70 border-light-foreground': row.getIsSelected(),
                }
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  tabIndex={cell.column.id !== 'select' ? 0 : undefined}
                  role='table cell'
                  key={cell.id}
                  className={cn(
                    'data-table-cell overflow-hidden',
                    'focus:outline-offset-0 focus:outline focus:outline-1 focus:outline-light-foreground focus:rounded-lg'
                  )}
                  style={{
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div
      role='table row'
      className='data-table-row flex mt-1.5 bg-background shadow'
    >
      <div
        role='cell'
        className='data-table-cell'
      >
        No data is found
      </div>
    </div>
  );
}

export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;
