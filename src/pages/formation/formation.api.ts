import axiosClient from '@/lib/axios';
import type { Formation, FormationInput } from '@/pages/formation';

export const getFormations = async (): Promise<Formation[]> => {
  const res = await axiosClient.get('/formations');
  return res.data.data;
};

export const deleteFormations = async (ids: (number | string)[]) => {
  const res = await axiosClient.delete('/formations', {
    data: {
      ids: ids,
    },
  });
  return res.data;
};

export const getCommonValues = async (): Promise<{
  intitules: string[];
  organismes: string[];
  code_domaines: number[];
}> => {
  const res = await axiosClient.get('/formations/commonValues');
  return res.data.data;
};

export const createFormation = async (formationsInputs: FormationInput) => {
  const res = await axiosClient.post('/formations', {
    ...formationsInputs,
  });
  return res.data;
};

export const getFormation = async ({
  queryKey,
}: {
  queryKey: any[];
}): Promise<Formation> => {
  const [_, { formationId }] = queryKey;
  const res = await axiosClient.get(`/formations/${formationId}`);
  return res.data.data;
};

export const editFormation = async ({
  formationId,
  body,
}: {
  formationId: string | undefined;
  body: Record<string, object>;
}) => {
  const res = await axiosClient.put(`/formations/${formationId ?? ''}`, {
    ...body,
  });
  return res.data;
};
