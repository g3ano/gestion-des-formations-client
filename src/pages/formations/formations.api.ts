import axiosClient from '@/lib/axios';
import { Formation } from '@/pages/formations';

export const getFormations = async (): Promise<Formation[]> => {
  const res = await axiosClient.get('/formation');
  return res.data.formations;
};

export const deleteFormations = async (ids: (number | string)[]) => {
  const res = await axiosClient.delete(`/formation`, {
    data: {
      ids: ids,
    },
  });
  return res.data;
};
