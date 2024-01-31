import {
  ColumnFiltersState,
  ColumnSizingInfoState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';

interface DataTableState {
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
  expanded: ExpandedState;
  setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>>;
}

const _FormationDataTableContext = createContext<DataTableState>({
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
  expanded: {},
  setExpanded: () => {},
});

export const FormationDataTableProvider = ({
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

  const [expanded, setExpanded] = useState<ExpandedState>({});

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
    expanded,
    setExpanded,
  };

  return (
    <_FormationDataTableContext.Provider value={values}>
      {children}
    </_FormationDataTableContext.Provider>
  );
};

export function FormationDataTableContext() {
  return useContext(_FormationDataTableContext);
}
