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
    dateNaissance: string;
    lieuNaissance: string;
    email: string;
    createdAt: string;
  };
  relationships: Record<string, unknown>;
}

export type EmployeeFormData = Omit<Employee['employee'], 'id' | 'createdAt'>;
export type EmployeeFormDataError = Record<'errors', Partial<EmployeeFormData>>;
