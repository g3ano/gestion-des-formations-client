import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { capitalize, cn } from '@/lib/utils';
import { Participant, getParticipants, useProgress } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { MapPin, UserRound } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

function ActionSingle() {
  const [searchParams] = useSearchParams();
  const filterParams: [string, string][] = [];

  for (const [key, value] of searchParams.entries()) {
    if (key !== 'view') {
      filterParams.push([key, value]);
    }
  }
  const {
    data: participants,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['actions', 'single', filterParams],
    queryFn: () => getParticipants(filterParams),
  });

  return (
    <>
      {isPending ? (
        <div className='flex items-center gap-2'>
          <div>Loading...</div>
        </div>
      ) : null}
      {isSuccess ? (
        participants.length ? (
          participants.map((participant) => (
            <CardSingle key={participant.id} participant={participant} />
          ))
        ) : (
          <div className='col-span-12'>Aucune action n&apos;a été trouvée</div>
        )
      ) : null}
    </>
  );
}
export default ActionSingle;

function CardSingle({
  participant: { action, employee },
}: {
  participant: Participant;
}) {
  const progress = useProgress(
    action?.attributes.dateDebut,
    action?.attributes.dateFin
  );

  return (
    <div
      className={cn(
        'group relative isolate col-span-4 min-h-[9.975rem] cursor-pointer overflow-hidden rounded-lg px-4 py-3 pb-4 transition-transform delay-300 duration-300',
        progress && progress === 100
          ? 'bg-green-600/10 hover:bg-green-600/25'
          : 'bg-red-600/10 hover:bg-red-600/25'
      )}
    >
      <Link
        to={`/actions/${action?.attributes.id}`}
        className='absolute inset-0'
      ></Link>
      <div className='absolute inset-0 -z-50 bg-card/75'></div>
      <div className='flex h-full'>
        <div className='flex flex-1 flex-col justify-between'>
          {action?.relationships.formation && (
            <h3 className='mb-4 line-clamp-2 text-lg'>
              {capitalize(
                action?.relationships.formation.relationships.intitule.intitule
              )}
            </h3>
          )}
          <div className='flex items-center gap-1'>
            <div className='space-y-1'>
              <p className='flex items-center gap-1'>
                <Icon render={UserRound} size='sm' />
                {employee ? (
                  <>
                    <span>{employee.attributes.nom ?? 'John'}</span>
                    <span>{employee.attributes.prenom ?? 'John'}</span>
                  </>
                ) : (
                  <span className='opacity-70'>No participant</span>
                )}
              </p>
              {action?.relationships.formation && (
                <p className='flex items-center gap-1'>
                  <Icon render={MapPin} size='sm' />
                  <span>
                    {capitalize(action.relationships.formation.attributes.lieu)}
                    .
                  </span>
                  à
                  <span>
                    {capitalize(
                      action.relationships.formation.relationships.organisme
                        .organisme
                    )}
                  </span>
                </p>
              )}
            </div>
            <div className='absolute inset-x-0 bottom-0 h-1'>
              <Progress
                value={progress}
                className='w-full bg-inherit'
                indicatorClassName={
                  progress === 100 ? 'h-full bg-green-700' : 'h-full bg-red-700'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
