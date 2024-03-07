import { Action } from '@/pages/action';

export type Sexe = 'M' | 'F';
export type Csp = 'C' | 'M' | 'CS';

export interface Employee {
  employee: {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    localite: string;
    sexe: Sexe;
    direction: string;
    csp: Csp;
    dateNaissance: number;
    lieuNaissance: string;
    email: string;
    isActive?: boolean;
    startedAt?: number;
    createdAt: number;
  };
  relationships?: {
    actions: Action[];
  };
}

export type EmployeeFormData = Omit<Employee['employee'], 'id' | 'createdAt'>;
export type EmployeeFormDataError = Record<'errors', Partial<EmployeeFormData>>;
