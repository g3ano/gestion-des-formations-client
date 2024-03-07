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
    formation: Formation;
    employees: Employee[];
  };
}

export interface Participant {
  action: Action;
  employee: Employee;
}

export type View = 'group' | 'single' | null;

export interface ActionFormData {
  action: {
    dateDebut: number;
    dateFin: number;
    prevision?: string;
    formationId: number;
  };
  participants: {
    employeeId: number;
    observation?: string;
  }[];
}
