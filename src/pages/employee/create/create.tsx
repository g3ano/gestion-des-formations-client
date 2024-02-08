import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/lib/hooks/use-toast';
import { queryClient } from '@/lib/router';
import { EmployeeCreateContext, EmployeeForm } from '@/pages/employee/create';
import { createEmployee } from '@/pages/employee/employee.api';
import { EmployeeFormData } from '@/pages/employee/employee.type';
import { useMutation } from '@tanstack/react-query';
import { CheckCheck, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmployeeCreate() {
  const { toast } = useToast();
  const { employee, reset } = EmployeeCreateContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (employee: EmployeeFormData) => createEmployee(employee),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      reset();
      navigate('/employees');
      toast({
        title: 'Employee est cree',
      });
    },
  });

  const handleCreate = () => {
    mutation.mutate(employee);
  };

  return (
    <Page title='Nouveau Employee'>
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          <form>
            <EmployeeForm />
          </form>
          <div className='absolute bottom-0 inset-x-0 pb-2'>
            <div className='flex items-end justify-between'>
              <div></div>
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
                  className='px-5'
                  onClick={handleCreate}
                >
                  <Icon
                    render={Save}
                    size='sm'
                    edge='left'
                  />
                  <span>Create</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
export default EmployeeCreate;
