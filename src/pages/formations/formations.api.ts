import axiosClient from '@/lib/axios';
import { Formation } from '@/pages/formations';

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
  intitules: [];
  organismes: [];
  code_domaines: [];
}> => {
  const res = await axiosClient.get('/formations/commonValues');
  return res.data;
};
