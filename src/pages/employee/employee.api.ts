import axiosClient from '@/lib/axios';
import { Employee, EmployeeFormData } from '@/pages/employee';
import { AxiosResponse } from 'axios';

export const getEmployees = async (): Promise<Employee[]> => {
  const res: AxiosResponse<{ data: Employee[] }> =
    await axiosClient.get('/employees');
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
      message: string;
      employeeId: number;
    };
  }> = await axiosClient.post('/employees', {
    ...employee,
  });
  return res.data.data;
};

export const getEmployee = async (employeeId: string): Promise<Employee> => {
  const res: AxiosResponse<{
    data: Employee;
  }> = await axiosClient.get(`/employees/${employeeId ?? ''}`);
  return res.data.data;
};

export const updateEmployee = async ({
  employeeId,
  employee,
}: {
  employeeId: string;
  employee: EmployeeFormData;
}) => {
  const res: AxiosResponse<{ message: string; employeeId: number }> =
    await axiosClient.put(`/employees/${employeeId ?? ''}`, { ...employee });
  return res.data;
};
