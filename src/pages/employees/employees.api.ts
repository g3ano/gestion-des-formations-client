import axiosClient from '@/lib/axios';
import { Employee } from '@/pages/employees';

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axiosClient.get('/employees');
  return res.data.employees;
};

export const deleteEmployees = async (ids: (number | string)[]) => {
  const res = await axiosClient.delete('/employees', {
    data: {
      ids: ids,
    },
  });
  return res.data;
};
