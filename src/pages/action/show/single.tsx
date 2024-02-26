import Icon from '@/components/ui/icon';
import { capitalize, cn } from '@/lib/utils';
import { getParticipants } from '@/pages/action/action.api';
import { Participant } from '@/pages/action/action.type';
import { useQuery } from '@tanstack/react-query';
import { getUnixTime } from 'date-fns';
import { Loader2, MapPin, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

// const csp = ['C', 'M', 'CS'];
// const sexe = ['masculin', 'féminin'];

function ActionSingle() {
  const {
    data: participants,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['actions', 'single'],
    queryFn: getParticipants,
  });

  return (
    <>
      {isPending ? (
        <div className='flex items-center gap-2'>
          <Icon
            render={Loader2}
            size='sm'
            className='animate-spin'
          />
          <div>Loading...</div>
        </div>
      ) : null}
      {isSuccess &&
        participants.map((participant) => (
          <CardSingle
            key={`${participant.employee.employee.id}${participant.action.action.id}`}
            participant={participant}
          />
        ))}
    </>
  );
}
export default ActionSingle;

const getProgress = (startDate: number, endDate: number) => {
  const now = getUnixTime(new Date());
  const progress = (now - startDate) / (endDate - startDate);

  return progress >= 1 ? 100 : Math.round(progress * 100);
};

function CardSingle({
  participant: { action, employee },
}: {
  participant: Participant;
}) {
  const progress = getProgress(action.action.dateDebut, action.action.dateFin);

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
              <div
                className={
                  progress === 100 ? 'h-full bg-green-700' : 'h-full bg-red-700'
                }
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
