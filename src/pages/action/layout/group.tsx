import Icon from '@/components/ui/icon';
import { capitalize, cn } from '@/lib/utils';
import { Action, getActions } from '@/pages/action';
import ErrorPage from '@/pages/error/error';
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
    isError,
    error,
  } = useQuery({
    queryKey: ['actions', 'group', filterParams],
    queryFn: () => getActions(filterParams),
  });

  return (
    <>
      {isError && <ErrorPage _error={error} />}
      {isPending ? (
        <div className='flex gap-2'>
          <div>Loading...</div>
        </div>
      ) : null}
      {isSuccess ? (
        actions.length ? (
          actions.map((action) => (
            <CardGroup key={action.attributes.id} action={action} />
          ))
        ) : (
          <div className='col-span-12'>Aucune action n&apos;a été trouvée</div>
        )
      ) : null}
    </>
  );
}

export default ActionGroup;

function CardGroup({
  action: { attributes, relationships },
}: {
  action: Action;
}) {
  return (
    <div
      className={cn(
        'group relative isolate col-span-4 h-[9.975rem] max-h-min cursor-pointer overflow-hidden rounded-lg bg-card px-4 py-3 pb-4 transition-transform delay-300 duration-300 hover:bg-accent'
      )}
    >
      <Link
        to={`/actions/${attributes.id}`}
        className='absolute inset-0'
      ></Link>
      <div className='absolute inset-0 -z-50 bg-card/75'></div>
      <div className='flex h-full'>
        <div className='flex flex-1 flex-col justify-between'>
          {relationships.formation && (
            <h3 className='mb-4 line-clamp-2 text-lg'>
              {capitalize(
                relationships.formation?.relationships.intitule.intitule
              )}
            </h3>
          )}
          <div className='flex items-center gap-1'>
            <div className='space-y-1'>
              {relationships.employees && (
                <p className='flex items-center gap-1'>
                  <Icon
                    render={UserRound}
                    size='sm'
                    className={
                      relationships.employees.length ? '' : 'opacity-70'
                    }
                  />
                  {relationships.employees.length ? (
                    <>
                      <span className='line-clamp-1'>
                        {relationships.employees?.[
                          relationships.employees.length - 1
                        ]?.attributes.nom ?? 'John'}
                      </span>
                      <span className='line-clamp-1'>
                        {relationships.employees?.[
                          relationships.employees.length - 1
                        ]?.attributes.prenom ?? 'Doe'}
                      </span>
                    </>
                  ) : (
                    <span className='opacity-70'>Aucun participant</span>
                  )}
                  {relationships.employees.length - 1 > 0 && (
                    <span className='line-clamp-1'>
                      et autres {relationships.employees.length - 1}
                    </span>
                  )}
                </p>
              )}
              {relationships.formation && (
                <p className='flex items-center gap-1'>
                  <Icon render={MapPin} size='sm' />
                  <span>
                    {capitalize(relationships.formation.attributes.lieu)}
                  </span>
                  A,
                  <span>
                    {capitalize(
                      relationships.formation.relationships.organisme.organisme
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
