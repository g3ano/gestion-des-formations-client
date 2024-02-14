import type {
  FormationFormData,
  FormationFormDataError,
} from '@/pages/formation';
import { createContext, useCallback, useContext, useState } from 'react';

interface FormationCreateContextState extends FormationFormData {
  reset: () => void;
  setCommon: React.Dispatch<
    React.SetStateAction<{
      intitule: string;
      organisme: string;
      codeDomaine: string;
    }>
  >;
  setDirect: React.Dispatch<
    React.SetStateAction<{
      structure: string;
      codeFormation: string;
      mode: string;
      lieu: string;
      effectif: string;
      durree: string;
      observation: string;
      categorieId: string;
      domaineId: string;
      typeId: string;
    }>
  >;
  setCout: React.Dispatch<
    React.SetStateAction<{
      pedagogiques: string;
      hebergementRestauration: string;
      transport: string;
      presalaire: string;
      autresCharges: string;
      dontDevise: string;
    }>
  >;
  errorBag: Partial<FormationFormDataError>;
  setErrorBag: React.Dispatch<
    React.SetStateAction<Partial<FormationFormDataError>>
  >;
}

const _FormationCreateContext = createContext<FormationCreateContextState>({
  direct: {
    structure: '',
    codeFormation: 'CDI',
    mode: 'Présentiel',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorieId: '1',
    domaineId: '1',
    typeId: '1',
  },
  setDirect: () => {},
  common: {
    intitule: '',
    organisme: '',
    codeDomaine: '',
  },
  setCommon: () => {},
  cout: {
    pedagogiques: '',
    hebergementRestauration: '',
    transport: '',
    presalaire: '',
    autresCharges: '',
    dontDevise: '',
  },
  setCout: () => {},
  reset: () => {},
  errorBag: {},
  setErrorBag: () => {},
});

export function FormationCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [direct, setDirect] = useState({
    structure: '',
    codeFormation: 'CDI',
    mode: 'Présentiel',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorieId: '1',
    domaineId: '1',
    typeId: '1',
  });
  const [common, setCommon] = useState({
    intitule: '',
    organisme: '',
    codeDomaine: '',
  });
  const [cout, setCout] = useState({
    pedagogiques: '',
    hebergementRestauration: '',
    transport: '',
    presalaire: '',
    autresCharges: '',
    dontDevise: '',
  });
  const [errorBag, setErrorBag] = useState<Partial<FormationFormDataError>>({});

  const reset = useCallback(() => {
    setDirect({
      structure: '',
      codeFormation: 'CDI',
      mode: 'Présentiel',
      lieu: '',
      effectif: '',
      durree: '',
      observation: '',
      categorieId: '1',
      domaineId: '1',
      typeId: '1',
    });
    setCommon({
      intitule: '',
      organisme: '',
      codeDomaine: '',
    });
    setCout({
      pedagogiques: '',
      hebergementRestauration: '',
      transport: '',
      presalaire: '',
      autresCharges: '',
      dontDevise: '',
    });
  }, []);

  const values = {
    direct,
    setDirect,
    common,
    setCommon: setCommon,
    cout,
    setCout,
    reset,
    errorBag,
    setErrorBag,
  };

  return (
    <_FormationCreateContext.Provider value={values}>
      {children}
    </_FormationCreateContext.Provider>
  );
}

export const FormationCreateContext = () => useContext(_FormationCreateContext);
