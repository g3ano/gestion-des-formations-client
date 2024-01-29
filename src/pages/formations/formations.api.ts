import axiosClient from '@/lib/axios';
import { Formation, FormationInput } from '@/pages/formations';

export const getFormations = async (): Promise<Formation[]> => {
  const res = await axiosClient.get('/formations');
  return res.data.formations;
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
  return res.data.commonValues;
};

export const createFormation = async (formationsInputs: FormationInput) => {
  const res = await axiosClient.post('/formations', {
    ...formationsInputs,
  });
  return res.data;
};

export const getFormation = async (id: string) => {
  const res = await axiosClient.get(`/formations/${id}`);
  return res.data;
};
