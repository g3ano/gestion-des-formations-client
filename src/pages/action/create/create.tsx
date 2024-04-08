import Page from '@/components/layout/page';
import Avatar from '@/components/ui/avatar';
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
  Dot,
  Loader2,
  RotateCcw,
  Save,
  User2,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

function ActionCreate() {
  const { step, backward, forward, current, total } = useStepper([
    <ActionDetailsForm key='details' />,
    <ActionSearchForm key='search' />,
  ]);
  const [errors, setErrors] = useState<Record<string, unknown>>();

  const { action, reset, setPreview, preview } = ActionCreateContext();

  const mutation = useMutation({
    mutationFn: (action: ActionFormData) => createAction(action),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['actions'],
      });
    },
    onError: (error) => {
      setErrors(error.response?.data.errors);
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
                    <PreviewItem title='Date de Début'>
                      {format(fromUnixTime(action.action.dateDebut), 'dd/MM/y')}
                    </PreviewItem>
                  )}
                  {action?.action.dateFin && (
                    <PreviewItem title='Date de Fin'>
                      {format(fromUnixTime(action.action.dateFin), 'dd/MM/y')}
                    </PreviewItem>
                  )}
                  {action?.action.prevision && (
                    <PreviewItem title='Les prévisions'>
                      {action.action.prevision}
                    </PreviewItem>
                  )}
                  {preview.formation && (
                    <PreviewItem title='Formation'>
                      {preview.formation}
                    </PreviewItem>
                  )}
                  {preview.participants.length ? (
                    <PreviewItem title='Les participants' vertical>
                      {preview.participants.map((participant) => (
                        <div
                          className='flex w-full items-center gap-4'
                          key={participant.matricule}
                        >
                          <Avatar icon={User2} />
                          <div>
                            <div className='flex items-center gap-2'>
                              <p className='line-clamp-1 flex-1'>
                                {participant.fullName}
                              </p>
                              <Icon
                                render={Dot}
                                className='text-muted-foreground'
                              />
                              <p>{participant.matricule}</p>
                            </div>
                            {participant.observation && (
                              <p className='line-clamp-1'>
                                {participant.observation}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </PreviewItem>
                  ) : null}
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

const PreviewItem = ({
  title,
  vertical = false,
  children,
}: {
  title: string;
  vertical?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn('flex justify-between gap-4', {
        'flex-col': vertical,
      })}
    >
      <p className='w-1/2 text-muted-foreground'>{title}</p>
      <div
        className={cn('line-clamp-2 w-1/2 text-left', {
          'w-full space-y-2': vertical,
        })}
      >
        {children}
      </div>
    </div>
  );
};
