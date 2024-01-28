import { createContext, useCallback, useContext, useState } from 'react';

interface TableState {
  filteredColumns: string[];
  setFilteredColumns: React.Dispatch<React.SetStateAction<string[]>>;
  resetFilteringColumns: () => void;
  toggleVisibilityMenu: boolean;
  setToggleVisibilityMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRowPerPage: boolean;
  setToggleRowPerPage: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TableContextState extends TableState {
  isFilteredColumn: (columnId: string) => boolean;
  addFilteredColumn: (columnId: string) => void;
  removeFilteredColumn: (columnId: string) => void;
}

const _TableContext = createContext<TableContextState>({
  filteredColumns: [],
  setFilteredColumns: () => {},
  resetFilteringColumns: () => {},
  isFilteredColumn: () => false,
  addFilteredColumn: () => {},
  removeFilteredColumn: () => {},
  toggleVisibilityMenu: false,
  setToggleVisibilityMenu: () => {},
  toggleRowPerPage: false,
  setToggleRowPerPage: () => {},
});

export const TableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
  const [toggleVisibilityMenu, setToggleVisibilityMenu] = useState(false);
  const [toggleRowPerPage, setToggleRowPerPage] = useState(false);

  const resetFilteringColumns = useCallback(() => {
    setFilteredColumns([]);
  }, []);
  const isFilteredColumn = useCallback(
    (columnId: string) => {
      return filteredColumns.includes(columnId);
    },
    [filteredColumns]
  );
  const addFilteredColumn = useCallback((columnId: string) => {
    setFilteredColumns((prev) => [...prev, columnId]);
  }, []);
  const removeFilteredColumn = useCallback((columnId: string) => {
    setFilteredColumns((prev) => {
      const result = prev.filter((id) => id !== columnId);
      return result;
    });
  }, []);

  const values = {
    filteredColumns,
    setFilteredColumns,
    resetFilteringColumns,
    isFilteredColumn,
    addFilteredColumn,
    removeFilteredColumn,
    toggleVisibilityMenu,
    setToggleVisibilityMenu,
    toggleRowPerPage,
    setToggleRowPerPage,
  };

  return (
    <_TableContext.Provider value={values}>{children}</_TableContext.Provider>
  );
};

export function TableContext() {
  return useContext(_TableContext);
}
