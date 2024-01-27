import { createContext, useContext, useState } from 'react';

interface TFormationInputs {
  directValues: {
    structure: string;
    code_formation: string;
    mode: string;
    lieu: string;
    effectif: string;
    durree: string;
    observation: string;
    categorie: string;
    domaine: string;
    type: string;
  };
  setDirectValues: React.Dispatch<
    React.SetStateAction<{
      structure: string;
      code_formation: string;
      mode: string;
      lieu: string;
      effectif: string;
      durree: string;
      observation: string;
      categorie: string;
      domaine: string;
      type: string;
    }>
  >;
  commonValues: {
    intitule: string;
    organisme: string;
    code_domaine: string;
  };
  setCommonValues: React.Dispatch<
    React.SetStateAction<{
      intitule: string;
      organisme: string;
      code_domaine: string;
    }>
  >;
  coutValues: {
    pedagogiques: string;
    hebergement_restauration: string;
    transport: string;
    presalaire: string;
    autres_charges: string;
    dont_devise: string;
  };
  setCoutValues: React.Dispatch<
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

const FormationsCreateInputs = createContext<TFormationInputs>({
  directValues: {
    structure: '',
    code_formation: '',
    mode: '',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorie: '',
    domaine: '',
    type: '',
  },
  setDirectValues: () => {},
  commonValues: {
    intitule: '',
    organisme: '',
    code_domaine: '',
  },
  setCommonValues: () => {},
  coutValues: {
    pedagogiques: '',
    hebergement_restauration: '',
    transport: '',
    presalaire: '',
    autres_charges: '',
    dont_devise: '',
  },
  setCoutValues: () => {},
});

export function FormationsCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [directValues, setDirectValues] = useState({
    structure: '',
    code_formation: '',
    mode: '',
    lieu: '',
    effectif: '',
    durree: '',
    observation: '',
    categorie: '',
    domaine: '',
    type: '',
  });
  const [commonValues, setCommonValues] = useState({
    intitule: '',
    organisme: '',
    code_domaine: '',
  });
  const [coutValues, setCoutValues] = useState({
    pedagogiques: '',
    hebergement_restauration: '',
    transport: '',
    presalaire: '',
    autres_charges: '',
    dont_devise: '',
  });
  const values = {
    directValues,
    setDirectValues,
    commonValues,
    setCommonValues,
    coutValues,
    setCoutValues,
  };

  return (
    <FormationsCreateInputs.Provider value={values}>
      {children}
    </FormationsCreateInputs.Provider>
  );
}

export const FormationsCreateContext = () => useContext(FormationsCreateInputs);
