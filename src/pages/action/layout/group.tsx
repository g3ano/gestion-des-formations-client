import Icon from '@/components/ui/icon';
import { capitalize, cn } from '@/lib/utils';
import { Action, getActions } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { MapPin, UserRound } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

function ActionGroup() {
  const [searchParams] = useSearchParams();
  const filterParams: [string, string][] = [];

  for (const [key, value] of searchParams.entries()) {
    if (key !== 'view') {
      filterParams.push([key, value]);
    }
  }
  const {
    data: actions,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['actions', 'group', filterParams],
    queryFn: () => getActions(filterParams),
  });

  return (
    <>
      {isPending ? (
        <div className='flex gap-2'>
          <div>Loading...</div>
        </div>
      ) : null}
      {isSuccess ? (
        actions.length ? (
          actions.map((action) => (
            <CardGroup
              key={action.action.id}
              action={action}
            />
          ))
        ) : (
          <div className='col-span-12'>Aucune action n&apos;a été trouvée</div>
        )
      ) : null}
    </>
  );
}

export default ActionGroup;

function CardGroup({ action: { action, relationships } }: { action: Action }) {
  return (
    <div
      className={cn(
        'h-[9.975rem] max-h-min col-span-4 bg-card rounded-lg px-4 py-3 pb-4 relative overflow-hidden group isolate hover:bg-accent transition-transform duration-300 delay-300 cursor-pointer'
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
