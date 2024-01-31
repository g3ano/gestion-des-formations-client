import { FormationCreateState } from '@/pages/formation/create/create-context';

export interface Formation {
  id: number;
  categorie: string;
  type: string;
  intitule: string;
  organisme: string;
  code_domaine: number;
  structure: string;
  code_formation: string;
  mode: string;
  lieu: string;
  effectif: number;
  durree: number;
  observation: string;
  domaine: string;
  pedagogiques: number;
  hebergement_restauration: number;
  transport: number;
  presalaire: number;
  autres_charges: number;
  dont_devise: number;
}

export interface FormationRaw extends Formation {
  categorie_id: number;
  domaine_id: number;
  type_id: number;
  intitule_id: number;
  organisme_id: number;
  code_domaine_id: number;
  cout_id: number;
}

export interface FormationInput
  extends Omit<FormationCreateState, 'setCommon' | 'setDirect' | 'setCout'> {}
