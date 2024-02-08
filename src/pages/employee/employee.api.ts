import axiosClient from '@/lib/axios';
import { Employee, EmployeeFormData } from '@/pages/employee';
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

export const createEmployee = async (employee: EmployeeFormData) => {
  const res: AxiosResponse<{
    data: {
      effected_row_id: number;
    };
  }> = await axiosClient.post('/employees', {
    ...employee,
  });
  return res.data.data;
};
