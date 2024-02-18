import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { queryClient } from '@/lib/router';
import { cn, objCompare } from '@/lib/utils';
import { getEmployee, updateEmployee } from '@/pages/employee';
import { EmployeeCreateContext, EmployeeForm } from '@/pages/employee/create';
import { EmployeeFormDataError } from '@/pages/employee/employee.type';
import ErrorPage from '@/pages/error/error';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CheckCheck, Loader2, RotateCcw, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeEdit() {
  const { employee, setEmployee, reset, setErrorBag } = EmployeeCreateContext();
  const navigate = useNavigate();
  const { employeeId } = useParams() as { employeeId: string };

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['employees', { employeeId }, 'edit'],
    queryFn: () => getEmployee(employeeId),
  });

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      reset();
      navigate('/employees');
    },
    onError: (error: AxiosError<EmployeeFormDataError>) => {
      if (error) {
        setErrorBag((prev) => ({
          ...prev,
          ...error?.response?.data,
        }));
      }
    },
  });

  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (isSuccess && data.employee) {
      const { employee: employeeData } = data;
      for (const field in employee) {
        if (
          employeeData[field as keyof typeof employeeData] ||
          employeeData[field as keyof typeof employeeData] === 0
        ) {
          setEmployee((prev) => ({
            ...prev,
            [field]: employeeData[field as keyof typeof employeeData],
          }));
        }
      }
    }
    return () => {
      reset();
      setErrorBag({ errors: {} });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, setEmployee, resetForm, setResetForm]);

  const handleEdit = () => {
    mutation.mutate({ employeeId, employee });
  };

  const isDirty = useMemo(() => {
    if (isSuccess && data.employee) {
      const { employee: employeeData } = data;
      const isEmployeeDirty = !objCompare(employee, {
        matricule: employeeData.matricule,
        nom: employeeData.nom,
        prenom: employeeData.prenom,
        localite: employeeData.localite,
        sexe: employeeData.sexe,
        direction: employeeData.direction,
        csp: employeeData.csp,
        dateNaissance: employeeData.dateNaissance,
        lieuNaissance: employeeData.lieuNaissance,
        email: employeeData.email,
      });
      return isEmployeeDirty;
    }
    return false;
  }, [isSuccess, data, employee]);

  if (isError) {
    return <ErrorPage _error={error} />;
  }

  return (
    <Page
      title='Modifier un Employee'
      actions={
        <div className='flex items-end justify-end'>
          <div className='space-x-2'>
            <Button variant='outline'>
              <Icon
                render={CheckCheck}
                size='sm'
                edge='left'
              />
              <span>Preview</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => setResetForm((prev) => !prev)}
              disabled={!isDirty}
            >
              <Icon
                render={RotateCcw}
                size='sm'
                edge='left'
              />
              <span>Resté</span>
            </Button>
            <Button
              className='pr-4'
              onClick={handleEdit}
              disabled={!isDirty || mutation.isPending}
            >
              <Icon
                render={mutation.isPending ? Loader2 : Save}
                size='sm'
                className={cn('mr-1', {
                  'animate-spin': mutation.isPending,
                })}
              />
              <span>Modifier</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          {isPending && (
            <div className='flex items-center gap-2'>
              <Icon
                render={Loader2}
                size='sm'
                className='animate-spin'
              />
              <div>Loading...</div>
            </div>
          )}
          {isSuccess && (
            <form>
              <EmployeeForm />
            </form>
          )}
        </div>
      </div>
    </Page>
  );
}
export default EmployeeEdit;
