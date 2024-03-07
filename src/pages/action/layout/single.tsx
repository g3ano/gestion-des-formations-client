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
            <CardSingle
              key={`${participant.employee.employee.id}${participant.action.action.id}`}
              participant={participant}
            />
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
  const progress = useProgress(action.action.dateDebut, action.action.dateFin);

  return (
    <div
      className={cn(
        'min-h-[9.975rem] col-span-4 rounded-lg px-4 py-3 pb-4 relative overflow-hidden group isolate transition-transform duration-300 delay-300 cursor-pointer',
        progress === 100
          ? 'bg-green-600/10 hover:bg-green-600/25'
          : 'bg-red-600/10 hover:bg-red-600/25'
      )}
    >
      <Link
        to={`/actions/${action.action.id}`}
        className='absolute inset-0'
      ></Link>
      <div className='bg-card/75 absolute -z-50 inset-0'></div>
      <div className='flex h-full'>
        <div className='flex flex-col justify-between flex-1'>
          <h3 className='text-lg mb-4 line-clamp-2'>
            {capitalize(
              action.relationships.formation.relationships.intitule.intitule
            )}
          </h3>
          <div className='flex items-center gap-1'>
            <div className='space-y-1'>
              <p className='flex items-center gap-1'>
                <Icon
                  render={UserRound}
                  size='sm'
                />
                {employee ? (
                  <>
                    <span>{employee.employee.nom ?? 'John'}</span>
                    <span>{employee.employee.prenom ?? 'John'}</span>
                  </>
                ) : (
                  <span className='opacity-70'>No participant</span>
                )}
              </p>
              <p className='flex items-center gap-1'>
                <Icon
                  render={MapPin}
                  size='sm'
                />
                <span>
                  {capitalize(action.relationships.formation.formation.lieu)}.
                </span>
                à
                <span>
                  {capitalize(
                    action.relationships.formation.relationships.organisme
                      .organisme
                  )}
                </span>
              </p>
            </div>
            <div className='absolute bottom-0 inset-x-0 h-1'>
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
