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
  action: ActionFormData;
  setAction: Dispatch<SetStateAction<ActionFormData>>;
  preview: {
    open: boolean;
    formation: string;
    participants: {
      id: number;
      fullName: string;
      matricule: string;
      observation: string | undefined;
    }[];
  };
  setPreview: Dispatch<
    SetStateAction<{
      open: boolean;
      formation: string;
      participants: {
        id: number;
        fullName: string;
        matricule: string;
        observation: string | undefined;
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
    open: false,
    formation: '',
    participants: [],
  },
  setPreview: () => {},
  reset: () => {},
  searchValue: '',
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
    formation: string;
    participants: {
      id: number;
      fullName: string;
      matricule: string;
      observation: string | undefined;
    }[];
  }>({
    open: false,
    formation: '',
    participants: [],
  });
  const [searchValue, setSearchValue] = useState('');
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
      open: false,
      formation: '',
      participants: [],
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
