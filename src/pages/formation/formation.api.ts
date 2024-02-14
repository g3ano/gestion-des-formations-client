import axiosClient from '@/lib/axios';
import type { Formation, FormationFormData } from '@/pages/formation';
import { AxiosResponse } from 'axios';

export const getFormations = async (): Promise<Formation[]> => {
  const res: AxiosResponse<{ data: Formation[] }> = await axiosClient.get(
    '/formations?include[]=intitule&include[]=categorie&include[]=type&include[]=organisme&include[]=codeDomaine&include[]=domaine&include[]=cout'
  );
  return res.data.data;
};

export const deleteFormations = async (ids: (number | string)[]) => {
  const res: AxiosResponse<{
    data: { message: string; effectedRows: number };
  }> = await axiosClient.delete('/formations', {
    data: {
      ids: ids,
    },
  });
  return res.data.data;
};

export const getCommonValues = async (): Promise<{
  intitules: string[];
  organismes: string[];
  codeDomaines: number[];
}> => {
  const res: AxiosResponse<{
    data: {
      intitules: string[];
      organismes: string[];
      codeDomaines: number[];
    };
  }> = await axiosClient.get('/formations/commonValues');
  return res.data.data;
};

export const createFormation = async (formations: FormationFormData) => {
  const res: AxiosResponse<{
    data: {
      message: string;
      formationId?: number;
    };
  }> = await axiosClient.post('/formations', {
    ...formations,
  });
  return res.data.data;
};

export const getFormation = async (formationId: string): Promise<Formation> => {
  const res: AxiosResponse<{
    data: Formation;
  }> = await axiosClient.get(
    `/formations/${
      formationId ?? ''
    }?include[]=intitule&include[]=categorie&include[]=type&include[]=organisme&include[]=codeDomaine&include[]=domaine&include[]=cout`
  );
  return res.data.data;
};

export const updateFormation = async ({
  formationId,
  body,
}: {
  formationId: string | undefined;
  body: Record<string, object>;
}) => {
  const res: AxiosResponse<{
    data: {
      message: string;
      formationId: number;
    };
  }> = await axiosClient.put(`/formations/${formationId ?? ''}`, {
    ...body,
  });
  return res.data.data;
};
