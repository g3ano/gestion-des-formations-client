import { Employee } from '@/pages/employee';
import { Formation } from '@/pages/formation';

export interface Action {
  action: {
    id: number;
    dateDebut: number;
    dateFin: number;
    prevision: string;
    createdAt: number;
  };
  relationships: {
    formation?: Formation;
    employees?: Employee[];
  };
}

export interface Participant {
  id: number;
  action?: Action;
  employee?: Employee;
}

export type View = 'group' | 'single' | null;

export interface ActionFormData {
  action: {
    dateDebut: number | null;
    dateFin: number | null;
    prevision?: string;
    formationId: number | null;
  };
  participants: {
    employeeId: number;
    observation?: string;
  }[];
}

export interface SearchResult {
  formations?: Formation[];
  actions?: Action[];
  employees?: Employee[];
}
