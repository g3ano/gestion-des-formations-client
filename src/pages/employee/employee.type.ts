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
    date_naissance: string;
    lieu_naissance: string;
    email: string;
    created_at: string;
  };
  relationships: Record<string, unknown>;
}

export type EmployeeFormData = Omit<Employee['employee'], 'id' | 'created_at'>;
