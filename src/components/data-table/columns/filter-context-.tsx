import { createContext, useContext, useState } from 'react';

interface TFilter {
  open: Record<string, boolean>;
  setOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const Filter = createContext<TFilter>({
  open: {},
  setOpen: () => {},
});

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const values = { open, setOpen };

  return <Filter.Provider value={values}>{children}</Filter.Provider>;
};

export const FilterContext = () => useContext(Filter);
