import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { useToast } from '@/lib/hooks/use-toast';
import { queryClient } from '@/lib/router';
import { cn } from '@/lib/utils';
import type { FormationFormData } from '@/pages/formation';
import { FormationFormDataError, createFormation } from '@/pages/formation';
import {
  CoutForm,
  DirectForm,
  FormationCreateContext,
} from '@/pages/formation/create';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Save,
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormationCreate() {
  const { toast } = useToast();
  const { step, backward, forward, current, total } = useStepper([
    <DirectForm key='direct' />,
    <CoutForm key='cout' />,
  ]);
  const { cout, common, direct, reset, setErrorBag } = FormationCreateContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formation: FormationFormData) => createFormation(formation),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
      reset();
      navigate('/formations');
      toast({
        title: data.message,
      });
    },
    onError: (error: AxiosError<FormationFormDataError>) => {
      setErrorBag((prev) => ({
        ...prev,
        ...error?.response?.data,
      }));
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setErrorBag({}), []);

  const handleCreate = () => {
    mutation.mutate({ direct, common, cout });
  };

  return (
    <Page
      title='Nouveau formation'
      actions={
        <div className='flex items-center justify-end'>
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
                className={cn('mr-1', {
                  'animate-spin': mutation.isPending,
                })}
              />
              <span>Crée</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          <form>{step}</form>
          <div className='absolute bottom-0 inset-x-0'>
            <div className='flex items-end justify-between'>
              <div>
                {current + 1} / {total}
              </div>
              <div className='flex items-center gap-2'>
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
          </div>
        </div>
      </div>
    </Page>
  );
}
export default FormationCreate;
