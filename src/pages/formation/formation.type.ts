import { Action } from '@/pages/action';

export interface Formation {
  formation: {
    id: number;
    structure: string;
    codeFormation: string;
    mode: string;
    lieu: string;
    effectif: number;
    durree: number;
    HJ: number;
    observation: string;
    createdAt: string;
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
    codeDomaine: {
      id: number;
      codeDomaine: number;
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
    cout: {
      id: number;
      pedagogiques: number;
      hebergementRestauration: number;
      transport: number;
      presalaire: number;
      autresCharges: number;
      dontDevise: number;
    };
    actions: Action[];
  };
}

export interface FormationFormData {
  direct: {
    structure: string;
    codeFormation: string;
    mode: string;
    lieu: string;
    effectif: string;
    durree: string;
    observation: string;
    categorieId: string;
    domaineId: string;
    typeId: string;
  };
  common: {
    intitule: string;
    organisme: string;
    codeDomaine: string;
  };
  cout: {
    pedagogiques: string;
    hebergementRestauration: string;
    transport: string;
    presalaire: string;
    autresCharges: string;
    dontDevise: string;
  };
}

export type FormationFormDataError = Record<
  'errors',
  Partial<FormationFormData>
>;
