import axiosClient from '@/lib/axios';
import { Employee } from '@/pages/employee';

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axiosClient.get('/employees');
  return res.data.data;
};

export const deleteEmployees = async (ids: (number | string)[]) => {
  const res = await axiosClient.delete('/employees', {
    data: {
      ids: ids,
    },
  });
  return res.data;
};
