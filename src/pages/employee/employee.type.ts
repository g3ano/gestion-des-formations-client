export type sexe = 'M' | 'F';
export type csp = 'M' | 'C';

export interface Employee {
  employee: {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    localite: string;
    sexe: sexe;
    direction: string;
    csp: csp;
    date_naissance: string;
    lieu_naissance: string;
    email: string;
    created_at: string;
  };
  relationships: Record<string, never>;
}
