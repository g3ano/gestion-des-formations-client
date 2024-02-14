import { EmployeeFormData, EmployeeFormDataError } from '@/pages/employee';
import { createContext, useCallback, useContext, useState } from 'react';

interface EmployeeCreateContextState {
  employee: EmployeeFormData;
  setEmployee: React.Dispatch<React.SetStateAction<EmployeeFormData>>;
  reset: () => void;
  errorBag: EmployeeFormDataError;
  setErrorBag: React.Dispatch<React.SetStateAction<EmployeeFormDataError>>;
}

const _EmployeeCreateContext = createContext<EmployeeCreateContextState>({
  employee: {
    prenom: '',
    localite: '',
    sexe: 'M',
    direction: '',
    csp: 'C',
    dateNaissance: 0,
    lieuNaissance: '',
    email: '',
    matricule: '',
    nom: '',
  },
  setEmployee: () => {},
  reset: () => {},
  errorBag: { errors: {} },
  setErrorBag: () => {},
});

export function EmployeeCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [employee, setEmployee] = useState<EmployeeFormData>({
    nom: '',
    prenom: '',
    localite: '',
    sexe: 'M',
    direction: '',
    csp: 'C',
    dateNaissance: 0,
    lieuNaissance: '',
    email: '',
    matricule: '',
  });
  const [errorBag, setErrorBag] = useState<EmployeeFormDataError>({
    errors: {},
  });
  const reset = useCallback(() => {
    setEmployee({
      nom: '',
      prenom: '',
      localite: '',
      sexe: 'M',
      direction: '',
      csp: 'C',
      dateNaissance: 0,
      lieuNaissance: '',
      email: '',
      matricule: '',
    });
  }, []);

  const values = {
    employee,
    setEmployee,
    reset,
    errorBag,
    setErrorBag,
  };

  return (
    <_EmployeeCreateContext.Provider value={values}>
      {children}
    </_EmployeeCreateContext.Provider>
  );
}

export const EmployeeCreateContext = () => useContext(_EmployeeCreateContext);
