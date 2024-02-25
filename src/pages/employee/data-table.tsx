import GlobalFilter from '@/components/data-table/global-search';
import Pagination from '@/components/data-table/pagination';
import Control from '@/components/data-table/rows/control';
import RowPerPage from '@/components/data-table/rows/row-per-page';
import VisibilityOptions from '@/components/data-table/visibility-options';
import { ScrollBar } from '@/components/ui/scroll-area';
import { TableContext } from '@/lib/contexts/table-context';
import { cn } from '@/lib/utils';
import {
  Employee,
  EmployeeDataTableContext,
  EmployeePreview,
  deleteEmployees,
} from '@/pages/employee';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  ColumnDef,
  Row,
  Table,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  data,
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
    expanded,
    setExpanded,
  } = EmployeeDataTableContext();

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
      expanded,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getExpandedRowModel: getExpandedRowModel(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    getRowId: (row: any) => String(row.employee.id),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number> = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnSizing, columnVisibility]);

  return (
    <div
      className={cn('grid grid-cols-11 grid-rows-12 gap-4 h-full relative', {
        'cursor-w-resize': !!table.getState().columnSizingInfo.isResizingColumn,
      })}
    >
      <div className='col-span-12 row-span-1 flex items-end flex-col md:flex-row md:justify-between'>
        <div className='w-full md:w-1/4'>
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div className='flex items-center gap-2'>
          {!!table.getSelectedRowModel().flatRows.length && (
            <Control
              table={table}
              queryFn={deleteEmployees}
              queryKey='employees'
            />
          )}
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
      <ScrollAreaPrimitive.Root
        className={cn(
          'col-span-12 row-span-10 overflow-auto flex max-h-full max-w-full rounded-lg'
        )}
      >
        <ScrollAreaPrimitive.Viewport
          ref={containerRef}
          className='h-full relative rounded-lg'
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
              className='grid sticky top-0 z-10 bg-card rounded-t-lg'
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  role='table row'
                  key={headerGroup.id}
                  className='w-full flex shadow rounded-t-lg pr-[2px]'
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <div
                        role='table header'
                        key={header.id}
                        className='flex w-full relative overflow-hidden'
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
                              'w-1 cursor-w-resize h-full hover:bg-accent absolute inset-y-0 right-0 transition duration-150 ease-in-out',
                              {
                                'bg-accent w-9': header.column.getIsResizing(),
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
            {columnSizingInfo.isResizingColumn ? (
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
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation='vertical' />
        <ScrollBar orientation='horizontal' />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>

      <div className='col-span-12 row-span-1 flex bg-card px-4 w-full shadow rounded-lg'>
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

  return virtualizer.getVirtualItems().length ? (
    <div
      role='table body'
      className={cn('grid relative', {
        'select-none': !!table.getState().columnSizingInfo.isResizingColumn,
      })}
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((vr) => {
        const row = table.getRowModel().rows[vr.index] as Row<Employee>;
        return (
          <div
            role='table row'
            data-index={vr.index}
            ref={(node) => virtualizer.measureElement(node)}
            key={row.id}
            className='w-full flex absolute'
            style={{
              transform: `translateY(${vr.start}px)`,
            }}
          >
            <div>
              <div
                className={cn(
                  'flex mt-1 bg-card relative border border-background select-none',
                  {
                    'bg-primary/25 border-primary/25': row.getIsSelected(),
                    'cursor-pointer':
                      !table.getState().columnSizingInfo.isResizingColumn,
                  }
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    role='table cell'
                    key={cell.id}
                    className={cn('data-table-cell overflow-hidden', {
                      'p-0': cell.column.id === 'expand',
                    })}
                    style={{
                      width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    }}
                    onClick={() => {
                      if (cell.column.id === 'expand') {
                        return;
                      } else {
                        row.toggleExpanded();
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
              {row.getIsExpanded() && (
                <EmployeePreview
                  row={row}
                  currentWidth={virtualizer.scrollRect.width}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div
      role='table row'
      className='data-table-row flex mt-1.5 bg-card shadow rounded-sm'
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

const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody;
