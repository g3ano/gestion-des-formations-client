import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { queryClient } from '@/lib/router';
import { cn } from '@/lib/utils';
import {
  ActionCreateContext,
  ActionFormData,
  createAction,
} from '@/pages/action';
import ActionDetailsForm from '@/pages/action/create/action-details-form';
import ActionSearchForm from '@/pages/action/create/action-search-form';
import { useMutation } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Save,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActionCreate() {
  const { step, backward, forward, current, total } = useStepper([
    <ActionDetailsForm key='details' />,
    <ActionSearchForm key='search' />,
  ]);
  const [errors, setErrors] = useState<Partial<ActionFormData>>();

  const { action, reset } = ActionCreateContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (action: ActionFormData) => createAction(action),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: ['actions'],
      });
      navigate(`/actions/${data.actionId}`);
    },
    onError: (_errors) => {
      setErrors(
        _errors.response?.data.errors as unknown as Partial<ActionFormData>
      );
    },
  });

  return (
    <Page
      title='Créer une nouvelle action'
      actions={
        <div className='flex items-center justify-end'>
          <div className='space-x-2'>
            <Button variant='outline' onClick={() => reset()}>
              <Icon render={RotateCcw} size='sm' edge='left' />
              <span>Resté</span>
            </Button>
            <Button
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(action)}
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
      <div className='flex h-full flex-col justify-between gap-8'>
        <div className='flex h-full gap-8 overflow-hidden px-0.5'>
          <div className='h-full w-full'>{step}</div>
        </div>
        <div className='flex items-end justify-between'>
          <div>
            {current + 1} / {total}
          </div>
          <div className='flex items-center gap-2'>
            <Button onClick={backward} disabled={current === 0}>
              <Icon render={ChevronLeft} size='sm' edge='left' />
              <p>Back</p>
            </Button>
            <Button onClick={forward} disabled={current === total - 1}>
              <p>Next</p>
              <Icon render={ChevronRight} size='sm' edge='right' />
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
export default ActionCreate;
