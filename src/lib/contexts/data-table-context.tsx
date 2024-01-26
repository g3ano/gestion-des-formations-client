import {
  ColumnFiltersState,
  ColumnSizingInfoState,
  ColumnSizingState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';

interface TDataTable<_TData> {
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection: {};
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  columnSizing: ColumnSizingState;
  setColumnSizing: React.Dispatch<React.SetStateAction<ColumnSizingState>>;
  columnSizingInfo: ColumnSizingInfoState;
  setColumnSizingInfo: React.Dispatch<
    React.SetStateAction<ColumnSizingInfoState>
  >;
}

const Table = createContext<TDataTable<any>>({
  columnVisibility: {},
  setColumnVisibility: () => {},
  setColumnFilters: () => {},
  rowSelection: {},
  setRowSelection: () => {},
  columnFilters: [],
  sorting: [],
  setSorting: () => {},
  pagination: {
    pageIndex: 0,
    pageSize: 100,
  },
  setPagination: () => {},
  globalFilter: '',
  setGlobalFilter: () => {},
  columnSizing: {},
  setColumnSizing: () => {},
  columnSizingInfo: {
    columnSizingStart: [],
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: '',
    startOffset: null,
    startSize: null,
  },
  setColumnSizingInfo: () => {},
});

export const DataTableProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnSizingInfo, setColumnSizingInfo] =
    useState<ColumnSizingInfoState>({
      columnSizingStart: [],
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: '',
      startOffset: null,
      startSize: null,
    });

  const values = {
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
  };

  return <Table.Provider value={values}>{children}</Table.Provider>;
};

export function DataTableContext<TData>() {
  return useContext<TDataTable<TData>>(Table);
}
