import { Employee } from '@/pages/employee';
import { Formation } from '@/pages/formation';

export interface Action {
  action: {
    id: number;
    dateDebut: number;
    dateFin: number;
    prevision: string;
    createdAt: string;
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
