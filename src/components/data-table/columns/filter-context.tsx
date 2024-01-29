import { createContext, useContext, useState } from 'react';

interface FitlerState {
  open: Record<string, boolean>;
  setOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const _FilterContext = createContext<FitlerState>({
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

  return (
    <_FilterContext.Provider value={values}>{children}</_FilterContext.Provider>
  );
};

export const FilterContext = () => useContext(_FilterContext);
