import axiosClient from '@/lib/axios';
import { Employee } from '@/pages/employee';
import { AxiosResponse } from 'axios';

export const getEmployees = async (): Promise<Employee[]> => {
  const res: AxiosResponse<{ data: Employee[] }> = await axiosClient.get(
    '/employees'
  );
  return res.data.data;
};

export const deleteEmployees = async (ids: (number | string)[]) => {
  const res: AxiosResponse<{
    data: { message: string; effectedRows: number };
  }> = await axiosClient.delete('/employees', {
    data: {
      ids: ids,
    },
  });
  return res.data.data;
};
