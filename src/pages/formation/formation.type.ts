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

export interface FormationFormData {
  direct: {
    structure: string;
    code_formation: string;
    mode: string;
    lieu: string;
    effectif: string;
    durree: string;
    observation: string;
    categorie_id: string;
    domaine_id: string;
    type_id: string;
  };
  common: {
    intitule: string;
    organisme: string;
    code_domaine: string;
  };
  cout: {
    pedagogiques: string;
    hebergement_restauration: string;
    transport: string;
    presalaire: string;
    autres_charges: string;
    dont_devise: string;
  };
}
