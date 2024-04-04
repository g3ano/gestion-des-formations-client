import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { format, fromUnixTime } from 'date-fns';
import {
  Bird,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Save,
} from 'lucide-react';

function ActionCreate() {
  const { step, backward, forward, current, total } = useStepper([
    <ActionSearchForm key='search' />,
    <ActionDetailsForm key='details' />,
  ]);

  const { action, reset, setPreview, preview } = ActionCreateContext();

  const mutation = useMutation({
    mutationFn: (action: ActionFormData) => createAction(action),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['actions'],
      });
    },
  });

  let isPreviewEmpty = true;
  if (
    action?.action.dateDebut ||
    action?.action.dateFin ||
    action?.action.prevision ||
    preview.formation ||
    preview.participants?.length
  ) {
    isPreviewEmpty = false;
  }

  return (
    <Page
      title='Créer une nouvelle action'
      actions={
        <div className='flex items-center justify-end'>
          <div className='space-x-2'>
            <Button
              variant='outline'
              onClick={() =>
                setPreview((prev) => ({
                  ...prev,
                  open: !prev.open,
                }))
              }
              className={cn('capitalize', {
                'border-secondary bg-secondary ring-secondary': preview.open,
              })}
            >
              <Icon render={CheckCheck} size='sm' edge='left' />
              <span>Preview</span>
            </Button>
            <Button variant='outline' onClick={() => reset()}>
              <Icon render={RotateCcw} size='sm' edge='left' />
              <span>Resté</span>
            </Button>
            <Button disabled={mutation.isPending}>
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
          <div
            className={cn('h-full w-full', {
              'w-3/4': preview.open,
            })}
          >
            {step}
          </div>
          {preview.open ? (
            <div className='relative flex w-1/4 flex-col gap-4 rounded-lg bg-card py-4'>
              <h3 className='px-6 text-2xl font-medium'>Preview</h3>

              {isPreviewEmpty ? (
                <div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'>
                  <Icon render={Bird} className='size-40 opacity-5' />
                </div>
              ) : null}

              <ScrollArea className='overflow-hidden px-6'>
                <div className='space-y-2'>
                  {action?.action.dateDebut && (
                    <div className='flex justify-between gap-4'>
                      <span className='text-muted-foreground'>
                        Date de Début
                      </span>
                      <span>
                        {format(
                          fromUnixTime(action.action.dateDebut),
                          'dd/MM/y'
                        )}
                      </span>
                    </div>
                  )}
                  {action?.action.dateFin && (
                    <div className='flex justify-between gap-4'>
                      <span className='text-muted-foreground'>Date de Fin</span>
                      <span>
                        {format(fromUnixTime(action.action.dateFin), 'dd/MM/y')}
                      </span>
                    </div>
                  )}
                  {action?.action.prevision && (
                    <div className='flex justify-between gap-8'>
                      <p className='w-1/3 text-nowrap text-muted-foreground'>
                        Les prévisions
                      </p>
                      <p className='line-clamp-3 break-words break-all'>
                        {action.action.prevision}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : null}
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
