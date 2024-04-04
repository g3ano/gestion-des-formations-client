import { Employee } from '@/pages/employee';
import { Formation } from '@/pages/formation';

export interface Action {
  type: 'action';
  attributes: {
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

export interface SearchResultShuffled {
  data: (Formation | Action | Employee)[];
  pagination: {
    page: number;
    pages: number;
  };
}
