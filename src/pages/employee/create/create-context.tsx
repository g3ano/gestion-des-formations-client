import { EmployeeFormData } from '@/pages/employee';
import { createContext, useCallback, useContext, useState } from 'react';

interface EmployeeCreateContextState {
  employee: EmployeeFormData;
  setEmployee: React.Dispatch<React.SetStateAction<EmployeeFormData>>;
  reset: () => void;
}

const _EmployeeCreateContext = createContext<EmployeeCreateContextState>({
  employee: {
    prenom: '',
    localite: '',
    sexe: 'M',
    direction: '',
    csp: 'C',
    date_naissance: '',
    lieu_naissance: '',
    email: '',
    matricule: '',
    nom: '',
  },
  setEmployee: () => {},
  reset: () => {},
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
    date_naissance: '',
    lieu_naissance: '',
    email: '',
    matricule: '',
  });
  const reset = useCallback(() => {
    setEmployee({
      nom: '',
      prenom: '',
      localite: '',
      sexe: 'M',
      direction: '',
      csp: 'C',
      date_naissance: '',
      lieu_naissance: '',
      email: '',
      matricule: '',
    });
  }, []);

  const values = {
    employee,
    setEmployee,
    reset,
  };

  return (
    <_EmployeeCreateContext.Provider value={values}>
      {children}
    </_EmployeeCreateContext.Provider>
  );
}

export const EmployeeCreateContext = () => useContext(_EmployeeCreateContext);
