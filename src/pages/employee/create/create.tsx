import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/lib/hooks/use-toast';
import { queryClient } from '@/lib/router';
import { cn } from '@/lib/utils';
import { createEmployee } from '@/pages/employee';
import { EmployeeCreateContext, EmployeeForm } from '@/pages/employee/create';
import {
  EmployeeFormData,
  EmployeeFormDataError,
} from '@/pages/employee/employee.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CheckCheck, Loader2, RotateCcw, Save } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeCreate() {
  const { toast } = useToast();
  const { employee, reset, setErrorBag } = EmployeeCreateContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (employee: EmployeeFormData) => createEmployee(employee),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      reset();
      navigate('/employees');
      toast({
        title: data.message,
      });
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

  useEffect(
    () => () => {
      return setErrorBag({ errors: {} });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCreate = () => {
    mutation.mutate(employee);
  };

  return (
    <Page
      title='Nouveau Employee'
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
              onClick={() => reset()}
            >
              <Icon
                render={RotateCcw}
                size='sm'
                edge='left'
              />
              <span>Resté</span>
            </Button>
            <Button
              onClick={handleCreate}
              disabled={mutation.isPending}
            >
              <Icon
                render={mutation.isPending ? Loader2 : Save}
                size='sm'
                className={cn('mr-2', {
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
          <form>
            <EmployeeForm />
          </form>
        </div>
      </div>
    </Page>
  );
}
export default EmployeeCreate;
