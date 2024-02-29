import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { getAction, useProgress } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime, isBefore } from 'date-fns';
import { Calendar, CalendarCheck, Goal } from 'lucide-react';
import { useParams } from 'react-router-dom';

function ActionPreview() {
  const { actionId } = useParams() as { actionId: string };

  const { data: action, isSuccess } = useQuery({
    queryKey: ['employees', { actionId }, 'edit'],
    queryFn: () => getAction(actionId),
  });

  const progress = useProgress(
    action?.action.dateDebut ?? 1,
    action?.action.dateFin ?? 1
  );

  return (
    <Page
      title=''
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center gap-4'>
            <Button>
              <span>Modifié L&apos;Action</span>
            </Button>
          </div>
        </div>
      }
      className={cn(
        progress < 100
          ? 'bg-gradient-to-b from-red-600/5'
          : 'bg-gradient-to-b from-green-600/5'
      )}
    >
      <div className='h-full'>
        <div className='flex h-full pb-2 gap-8 lg:gap-16'>
          <ScrollArea className='w-full h-full rounded-lg'>
            {isSuccess && (
              <div className='h-full basis-4/6 lg:basis-4/5'>
                <div className='w-full'>
                  <div className='flex flex-col gap-8 min-h-40'>
                    <div className='flex gap-4'>
                      <CircularProgress progress={progress} />

                      <div className='flex flex-col justify-center gap-1'>
                        <div>
                          <h3 className='text-2xl font-bold'>
                            {
                              action.relationships.formation.relationships
                                .intitule.intitule
                            }
                          </h3>
                        </div>
                        <div className='flex gap-1 text-muted-foreground'>
                          <p>Depuis</p>
                          <p>
                            {format(
                              fromUnixTime(action.action.createdAt),
                              'dd MMMM y'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='mb-8 space-y-3'>
                      <div className='flex gap-8'>
                        <div className='flex items-center gap-2'>
                          <Icon
                            render={Calendar}
                            size='sm'
                          />
                          <div className='flex justify-center gap-1'>
                            <p>Commencée le</p>
                            <p className='line-clamp-2 flex-1'>
                              {format(
                                fromUnixTime(action.action.dateDebut),
                                'dd MMMM y'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Icon
                            render={CalendarCheck}
                            size='sm'
                          />
                          <div className='flex justify-center gap-1'>
                            <p>
                              {isBefore(
                                new Date(),
                                fromUnixTime(action.action.dateFin)
                              )
                                ? 'Terminera le'
                                : 'Terminée le'}
                            </p>
                            <p className='line-clamp-2 flex-1'>
                              {format(
                                fromUnixTime(action.action.dateFin),
                                'dd MMMM y'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='flex gap-2'>
                        <div className=''>
                          <Icon
                            render={Goal}
                            size='sm'
                          />
                        </div>
                        <div className='flex flex-col gap-1'>
                          <p>Prévision</p>
                          <p className='flex-1 max-w-2xl'>
                            {action.action.prevision ||
                              "Aucune prévision n'est trouvée"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </Page>
  );
}

export default ActionPreview;

function CircularProgress({ progress }: { progress: number }) {
  return (
    <div className='w-20 h-20 relative'>
      <svg
        className='absolute top-0 left-0 w-full h-full bg-transparent'
        viewBox='0 0 100 100'
      >
        <circle
          className='fill-transparent stroke-current text-transparent'
          cx='50'
          cy='50'
          r='40'
          strokeWidth='10'
        ></circle>
        <circle
          className={cn(
            'progress-ring-circle fill-transparent stroke-current rounded-full',
            progress < 100 ? 'text-red-600/90' : 'text-green-600/90'
          )}
          cx='50'
          cy='50'
          r='40'
          strokeWidth='10'
          strokeLinecap='round'
          strokeDasharray='251'
          strokeDashoffset={`calc(251 - ${progress / 100} * 251`}
        ></circle>
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-lg font-bold text-foreground'>{progress}%</span>
      </div>
    </div>
  );
}
