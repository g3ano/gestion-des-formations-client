import { FormationCreateState } from '@/pages/formation/create/create-context';

export interface Formation {
  formation: {
    id: number;
    structure: string;
    code_formation: string;
    mode: string;
    lieu: string;
    effectif: number;
    durree: number;
    h_j: number;
    observation: string;
    created_at: string;
  };
  relationships: {
    intitule: {
      id: number;
      intitule: string;
    };
    organisme: {
      id: number;
      organisme: string;
    };
    code_domaine: {
      id: number;
      code_domaine: number;
    };
    categorie: {
      id: number;
      categorie: string;
    };
    domaine: {
      id: number;
      domaine: string;
    };
    type: {
      id: number;
      type: string;
    };
    couts: {
      id: number;
      pedagogiques: string;
      hebergement_restauration: string;
      transport: string;
      presalaire: string;
      autres_charges: string;
      dont_devise: string;
    };
  };
}

export interface FormationInput
  extends Omit<FormationCreateState, 'setCommon' | 'setDirect' | 'setCout'> {}
