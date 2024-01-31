import { createContext, useCallback, useContext, useState } from 'react';

export interface FormationCreateState {
  direct: {
    structure: string;
    code_formation: string;
    mode: string;
    lieu: string;
    effectif: string;
    durree: string;
    observation: string;
    categorie_id: string;
    domaine_id: string;
    type_id: string;
  };
  setDirect: React.Dispatch<
    React.SetStateAction<{
      structure: string;
      code_formation: string;
      mode: string;
      lieu: string;
      effectif: string;
      durree: string;
      observation: string;
      categorie_id: string;
      domaine_id: string;
      type_id: string;
    }>
  >;
  common: {
    intitule: string;
    organisme: string;
    code_domaine: string;
  };
  setCommon: React.Dispatch<
    React.SetStateAction<{
      intitule: string;
      organisme: string;
      code_domaine: string;
    }>
  >;
  cout: {
    pedagogiques: string;
    hebergement_restauration: string;
    transport: string;
    presalaire: string;
    autres_charges: string;
    dont_devise: string;
  };
  setCout: React.Dispatch<
    React.SetStateAction<{
      pedagogiques: string;
      hebergement_restauration: string;
      transport: string;
      presalaire: string;
      autres_charges: string;
      dont_devise: string;
    }>
  >;
}

interface FormationCreateContextState extends FormationCreateState {
  reset: () => void;
}

const _FormationCreateContext = createContext<FormationCreateContextState>({
  direct: {
    structure: '',
    code_formation: '',
    mode: '',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorie_id: '',
    domaine_id: '',
    type_id: '',
  },
  setDirect: () => {},
  common: {
    intitule: '',
    organisme: '',
    code_domaine: '',
  },
  setCommon: () => {},
  cout: {
    pedagogiques: '',
    hebergement_restauration: '',
    transport: '',
    presalaire: '',
    autres_charges: '',
    dont_devise: '',
  },
  setCout: () => {},
  reset: () => {},
});

export function FormationCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [direct, setDirect] = useState({
    structure: '',
    code_formation: '',
    mode: '',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorie_id: '',
    domaine_id: '',
    type_id: '',
  });
  const [common, setCommon] = useState({
    intitule: '',
    organisme: '',
    code_domaine: '',
  });
  const [cout, setCout] = useState({
    pedagogiques: '',
    hebergement_restauration: '',
    transport: '',
    presalaire: '',
    autres_charges: '',
    dont_devise: '',
  });

  const reset = useCallback(() => {
    setDirect({
      structure: '',
      code_formation: '',
      mode: '',
      lieu: '',
      effectif: '',
      durree: '',
      observation: '',
      categorie_id: '',
      domaine_id: '',
      type_id: '',
    });
    setCommon({
      intitule: '',
      organisme: '',
      code_domaine: '',
    });
    setCout({
      pedagogiques: '',
      hebergement_restauration: '',
      transport: '',
      presalaire: '',
      autres_charges: '',
      dont_devise: '',
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
  };

  return (
    <_FormationCreateContext.Provider value={values}>
      {children}
    </_FormationCreateContext.Provider>
  );
}

export const FormationCreateContext = () => useContext(_FormationCreateContext);
