import Icon from '@/components/ui/icon';
import { capitalize, cn } from '@/lib/utils';
import { Action, getActions } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { Loader2, MapPin, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

function ActionGroup() {
  const {
    data: actions,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['actions', 'Group'],
    queryFn: getActions,
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
        actions.map((action) => (
          <CardGroup
            key={action.action.id}
            action={action}
          />
        ))}
      <div></div>
    </>
  );
}

export default ActionGroup;

function CardGroup({ action: { action, relationships } }: { action: Action }) {
  return (
    <div
      className={cn(
        'col-span-4 bg-card rounded-lg px-4 py-3 pb-4 relative overflow-hidden group isolate hover:scale-105 transition-transform duration-300 delay-300 cursor-pointer'
      )}
    >
      <Link
        to={`/actions/${action.id}`}
        className='absolute inset-0'
      ></Link>
      <div className='bg-card/75 absolute -z-50 inset-0'></div>
      <div className='flex h-full'>
        <div className='flex flex-col justify-between flex-1'>
          <h3 className='text-lg mb-4 line-clamp-2'>
            {capitalize(
              relationships.formation.relationships?.intitule.intitule
            )}
          </h3>
          <div className='flex items-center gap-1'>
            <div className='space-y-1'>
              <p className='flex items-center gap-1'>
                <Icon
                  render={UserRound}
                  size='sm'
                  className={relationships.employees.length ? '' : 'opacity-70'}
                />
                {relationships.employees.length ? (
                  <>
                    <span>
                      {relationships.employees?.[
                        relationships.employees.length - 1
                      ]?.employee.nom ?? 'John'}
                    </span>
                    <span>
                      {relationships.employees?.[
                        relationships.employees.length - 1
                      ]?.employee.prenom ?? 'Doe'}
                    </span>
                  </>
                ) : (
                  <span className='opacity-70'>No participant</span>
                )}
                {relationships.employees.length - 1 > 0 && (
                  <span>et autres {relationships.employees.length - 1}</span>
                )}
              </p>
              <p className='flex items-center gap-1'>
                <Icon
                  render={MapPin}
                  size='sm'
                />
                <span>
                  {capitalize(relationships.formation.formation.lieu)}
                </span>
                A,
                <span>
                  {capitalize(
                    relationships.formation.relationships.organisme.organisme
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
