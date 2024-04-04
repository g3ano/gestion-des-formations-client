import { ActionFormData } from '@/pages/action';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

interface ActionCreateContextState {
  action?: ActionFormData;
  setAction: Dispatch<SetStateAction<ActionFormData>>;
  preview: {
    open: boolean;
    formation?: string;
    participants?: {
      fullName: string;
      matricule: number;
    }[];
  };
  setPreview: Dispatch<
    SetStateAction<{
      open: boolean;
      formation?: string;
      participants?: {
        fullName: string;
        matricule: number;
      }[];
    }>
  >;
  reset: () => void;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const _ActionCreateContext = createContext<ActionCreateContextState>({
  action: {
    action: {
      dateDebut: null,
      dateFin: null,
      prevision: '',
      formationId: null,
    },
    participants: [],
  },
  setAction: () => {},
  preview: {
    open: true,
  },
  setPreview: () => {},
  reset: () => {},
  searchValue: 'al',
  setSearchValue: () => {},
});

export const ActionCreateProvider = ({ children }: { children: ReactNode }) => {
  const [action, setAction] = useState<ActionFormData>({
    action: {
      dateDebut: null,
      dateFin: null,
      prevision: '',
      formationId: null,
    },
    participants: [],
  });
  const [preview, setPreview] = useState<{
    open: boolean;
    formation?: string;
    participants?: {
      fullName: string;
      matricule: number;
    }[];
  }>({
    open: true,
  });
  const [searchValue, setSearchValue] = useState('al');
  const reset = useCallback(() => {
    setAction({
      action: {
        dateDebut: null,
        dateFin: null,
        prevision: '',
        formationId: null,
      },
      participants: [],
    });
    setPreview({
      open: true,
    });
    setSearchValue('');
  }, []);

  const values = {
    action,
    setAction,
    preview,
    setPreview,
    reset,
    searchValue,
    setSearchValue,
  };

  return (
    <_ActionCreateContext.Provider value={values}>
      {children}
    </_ActionCreateContext.Provider>
  );
};

export const ActionCreateContext = () => useContext(_ActionCreateContext);
