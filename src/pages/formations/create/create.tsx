import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { FormationInput, createFormation } from '@/pages/formations';
import { FormationsCreateContext } from '@/pages/formations/create';
import { CoutForm } from '@/pages/formations/create/steps/cout-form';
import { DirectForm } from '@/pages/formations/create/steps/direct-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCheck, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FormationsCreate = () => {
  const { step, backward, forward, current, total } = useStepper([
    <DirectForm />,
    <CoutForm />,
  ]);
  const { cout, common, direct, reset } = FormationsCreateContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formationsInputs: FormationInput) =>
      createFormation(formationsInputs),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
      reset();
      navigate('/formations');
    },
  });

  const handleCreate = () => {
    mutation.mutate({ direct, common, cout });
  };

  return (
    <Page
      title='Nouveau formation'
      actions={
        <div className='flex items-center justify-end'>
          <div className='flex items-center gap-1'>
            <Button
              onClick={backward}
              disabled={current === 0}
            >
              <Icon
                render={ChevronLeft}
                size='sm'
                edge='left'
              />
              <p>Back</p>
            </Button>

            <Button
              onClick={forward}
              disabled={current === total - 1}
            >
              <p>Next</p>
              <Icon
                render={ChevronRight}
                size='sm'
                edge='right'
              />
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between pb-8 relative'>
        <div className='w-full h-full rounded-lg'>
          <form>{step}</form>
          <div className='absolute bottom-0 inset-x-0 pb-6'>
            <div className='flex items-end justify-between'>
              <div>
                {current + 1} / {total}
              </div>

              {current === total - 1 && (
                <div className='space-x-2'>
                  <Button className='space-x-1'>
                    <Icon
                      render={CheckCheck}
                      size='sm'
                      edge='left'
                    />
                    <span>Preview</span>
                  </Button>
                  <Button
                    className='space-x-1'
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
