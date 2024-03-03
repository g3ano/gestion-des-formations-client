import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { capitalize, cn } from '@/lib/utils';
import { ActiveEmployee, getAction, useProgress } from '@/pages/action';
import { Employee } from '@/pages/employee';
import ErrorPage from '@/pages/error/error';
import { Formation } from '@/pages/formation';
import { useQuery } from '@tanstack/react-query';
import { format, fromUnixTime } from 'date-fns';
import { Calendar, CalendarCheck, Goal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

function ActionPreview() {
  const { actionId } = useParams() as { actionId: string };

  const {
    data: action,
    isSuccess,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['employees', { actionId }, 'edit'],
    queryFn: () => getAction(actionId),
  });

  const progress = useProgress(
    action?.action.dateDebut ?? 1,
    action?.action.dateFin ?? 1
  );

  return (
    <Page
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
      <div className='flex flex-col h-full pb-2 gap-8 lg:gap-12'>
        {isError && <ErrorPage _error={error} />}
        {isPending && <div>Loading...</div>}
        {isSuccess && (
          <>
            <div className='flex flex-col gap-8 min-h-40 mb-20'>
              <div className='flex gap-4'>
                <CircularProgress progress={progress} />

                <div className='flex flex-col justify-center gap-1'>
                  <h3 className='text-2xl font-bold'>
                    {
                      action.relationships.formation.relationships.intitule
                        .intitule
                    }
                  </h3>

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

              <div className='space-y-3'>
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
                      <p>{progress < 100 ? 'Terminera le' : 'Terminée le'}</p>
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
                  <Icon
                    render={Goal}
                    size='sm'
                  />
                  <div className='flex flex-col gap-1'>
                    <p>Prévision</p>
                    <p className='flex-1 max-w-2xl line-clamp-3'>
                      {action.action.prevision ||
                        "Aucune prévision n'est trouvée"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='h-full flex gap-4 overflow-hidden'>
              <ScrollArea className='h-full basis-2/5 rounded-lg relative'>
                <FormationInfo formation={action.relationships.formation} />
              </ScrollArea>

              <div className='basis-4/5 rounded-lg overflow-hidden h-full'>
                <EmployeeInfo
                  employees={action.relationships.employees}
                  activeEmployees={action.action.activeEmployees}
                />
              </div>
            </div>
          </>
        )}
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

function FormationInfo({ formation }: { formation: Formation }) {
  const coutKeys = useMemo(
    () =>
      Object.keys(formation.relationships.cout).filter(
        (key) => key !== 'id' && key !== 'createdAt'
      ),
    [formation.relationships.cout]
  );

  const coutValues = useMemo(
    () =>
      Object.values(formation.relationships.cout).filter(
        (_, index) => index !== 0
      ),
    [formation.relationships.cout]
  );

  return (
    <>
      <div className='bg-card flex flex-col gap-6 rounded-lg pt-6'>
        <div className='px-6'>
          <h3 className='text-2xl font-bold'>Formation</h3>
        </div>
        <div className='h-full flex flex-col justify-between gap-6'>
          <div className='px-6'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='border-b border-secondary flex-1'></div>
              <h4 className='font-medium tracking-wide'>Formation Prévu</h4>
              <div className='border-b border-secondary flex-1'></div>
            </div>
            <div className='h-full *:flex *:justify-between *:gap-8'>
              <div>
                <span>Structure</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.formation.structure)}
                </span>
              </div>
              <div>
                <span>Mode</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.formation.mode)}
                </span>
              </div>
              <div>
                <span>Code formation</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.codeFormation}
                </span>
              </div>
              <div>
                <span>Lieu</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.lieu}
                </span>
              </div>
              <div>
                <span>Code domaine</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.relationships.codeDomaine.codeDomaine}
                </span>
              </div>
              <div>
                <span>Domaine</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.domaine.domaine)}
                </span>
              </div>
              <div>
                <span>Organisme</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.organisme.organisme)}
                </span>
              </div>
              <div>
                <span>Type</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.type.type)}
                </span>
              </div>
              <div>
                <span>Categorie</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.categorie.categorie)}
                </span>
              </div>
            </div>
          </div>

          <div className='px-6'>
            <div className='flex items-center gap-1 mb-2'>
              <div className='border-b border-secondary flex-1'></div>
              <h4 className='font-medium tracking-wide'>Effectif a former</h4>
              <div className='border-b border-secondary flex-1'></div>
            </div>
            <div className='*:flex *:justify-between *:items-center *:gap-8'>
              <div>
                <span>Durée</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.durree}
                </span>
              </div>
              <div>
                <span>Effectifs</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.effectif}
                </span>
              </div>
              <div>
                <span>H/J</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.HJ}
                </span>
              </div>
            </div>
          </div>

          <div className='h-full flex flex-col flex-1'>
            <div className='flex items-center gap-2 px-6 mb-2'>
              <div className='border-b border-secondary flex-1'></div>
              <h4 className='font-medium tracking-wide'>Cout</h4>
              <div className='border-b border-secondary flex-1'></div>
            </div>
            <div className='divide-y divide-secondary'>
              {coutKeys.map((key, index) => (
                <div
                  key={key}
                  className='flex justify-between px-6 *:py-2'
                >
                  <p className='flex-1 flex items-center'>{capitalize(key)}</p>
                  <p className='flex-1 flex justify-center items-center'>
                    {coutValues[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EmployeeInfo({
  employees,
  activeEmployees,
}: {
  employees: Employee[];
  activeEmployees?: ActiveEmployee[];
}) {
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(
    employees[0]
  );

  const isActive = useMemo(() => {
    if (activeEmployees && activeEmployees.length) {
      return activeEmployees.find(
        ({ id }) => id === currentEmployee?.employee.id
      );
    }
    return false;
  }, [activeEmployees, currentEmployee]);

  const activeEmployeesId = useMemo(() => {
    if (activeEmployees && activeEmployees.length) {
      return activeEmployees.map((activeEmployee) => activeEmployee.id);
    }
    return [];
  }, [activeEmployees]);

  const employeesStatus: {
    activeEmployees: Employee[];
    inactiveEmployees: Employee[];
  } = useMemo(() => {
    if (!activeEmployeesId.length) {
      return {
        activeEmployees: [],
        inactiveEmployees: employees,
      };
    }
    const activeEmployees = employees.filter((employee) =>
      activeEmployeesId?.includes(employee.employee.id)
    );
    const inactiveEmployees = employees.filter(
      (employee) => !activeEmployeesId?.includes(employee.employee.id)
    );
    return {
      activeEmployees,
      inactiveEmployees,
    };
  }, [activeEmployeesId, employees]);

  return (
    <div className='flex gap-1 h-full'>
      <div className='bg-card h-full flex flex-col gap-6 py-6 rounded-r'>
        <div className='px-6'>
          <h3 className='text-2xl font-bold'>Employées</h3>
        </div>
        <ScrollArea className='h-full w-full'>
          <div className='px-6 h-min'>
            {employeesStatus.activeEmployees.length ? (
              <>
                <p className='mb-4 font-medium'>Employés actif</p>
                <div className='space-y-2 '>
                  {employeesStatus.activeEmployees.map(({ employee }) => (
                    <div
                      key={employee.id}
                      className={cn(
                        'py-2 isolate relative rounded-lg cursor-pointer',
                        {
                          'bg-secondary':
                            employee.id === currentEmployee.employee.id,
                        }
                      )}
                      onClick={() => setCurrentEmployee({ employee })}
                    >
                      {employee.id === currentEmployee.employee.id && (
                        <div className='absolute inset-0 -z-10 bg-secondary -translate-x-6 border-l-2 border-primary'></div>
                      )}

                      <div className='flex items-center gap-2'>
                        <div className='size-12 bg-background flex items-center justify-center relative rounded-sm p-2'>
                          <p className='font-medium uppercase'>
                            {employee.nom.slice(0, 1)}
                          </p>
                          <p className='font-medium uppercase'>
                            {employee.prenom.slice(0, 1)}
                          </p>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className='absolute bottom-0 right-0 size-2 rounded-full bg-green-500 z-10'></div>
                              </TooltipTrigger>
                              <TooltipContent
                                side='right'
                                sideOffset={20}
                              >
                                Cet employé est engagé dans l&apos;action en
                                cours
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className='flex-1 flex flex-col justify-center'>
                          <div className='line-clamp-1 pe-4 flex text-nowrap'>
                            <p>{employee.nom}</p>
                            <p>{employee.prenom}</p>
                          </div>
                          <p className='text-muted-foreground'>
                            {employee.matricule}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {employeesStatus.inactiveEmployees.length ? (
              <>
                <p
                  className={cn(
                    'mb-4 font-medium',
                    activeEmployees?.length ? 'my-4' : ''
                  )}
                >
                  Employés inactif
                </p>
                <div>
                  {employeesStatus.inactiveEmployees.map(({ employee }) => (
                    <div
                      key={employee.id}
                      className={cn(
                        'py-2 isolate relative rounded-lg cursor-pointer',
                        {
                          'bg-secondary':
                            employee.id === currentEmployee.employee.id,
                        }
                      )}
                      onClick={() => setCurrentEmployee({ employee })}
                    >
                      {employee.id === currentEmployee.employee.id && (
                        <div className='absolute inset-0 -z-10 bg-secondary -translate-x-6 border-l-2 border-primary'></div>
                      )}

                      <div className='flex items-center gap-2'>
                        <div className='size-12 bg-background flex items-center justify-center relative rounded-sm p-2'>
                          <p className='font-medium uppercase'>
                            {employee.nom.slice(0, 1)}
                          </p>
                          <p className='font-medium uppercase'>
                            {employee.prenom.slice(0, 1)}
                          </p>
                        </div>

                        <div className='flex-1 flex flex-col justify-center'>
                          <div className='line-clamp-1 pe-4 flex text-nowrap'>
                            <p>{employee.nom}</p>
                            <p>{employee.prenom}</p>
                          </div>
                          <p className='text-muted-foreground'>
                            {employee.matricule}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </ScrollArea>
      </div>
      <ScrollArea className='flex-1 bg-card w-full h-full rounded-r-lg rounded-l p-6'>
        <div className='space-y-4'>
          <div className='text-xl flex flex-col'>
            <div className='text-nowrap space-x-1'>
              <span>Matricule</span>
              <span className='font-medium'>
                {currentEmployee.employee.matricule}
              </span>
            </div>
            <div className='text-muted-foreground text-base'>
              <span>Depuis</span>{' '}
              <span>
                {format(
                  fromUnixTime(currentEmployee.employee.createdAt),
                  'd MMMM y'
                )}
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-4 *:flex-1'>
            <div className='space-y-2 p-4 rounded-lg border border-secondary flex-1'>
              <h4 className='font-medium'>Détails General</h4>
              <div className='flex justify-between gap-4 *:max-w-48 *:min-w-32'>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Nom</p>
                  <p className='line-clamp-2 break-words'>
                    {capitalize(currentEmployee.employee.nom)}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Prenom</p>
                  <p className='line-clamp-2'>
                    {capitalize(currentEmployee.employee.prenom)}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>
                    Adresse email
                  </p>
                  <p className='line-clamp-2 break-words'>
                    {currentEmployee.employee.email}
                  </p>
                </div>
                {isActive && (
                  <div>
                    <p className='text-muted-foreground text-nowrap'>
                      Date de début
                    </p>
                    <p className='line-clamp-2 break-words'>
                      {format(fromUnixTime(isActive.startedAt), 'd MMMM y')}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-2 p-4 rounded-lg border border-secondary'>
              <h4 className='font-medium'>Détails personnel</h4>
              <div className='flex justify-between gap-4 *:max-w-48 *:min-w-32'>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Sexe</p>
                  <p className='line-clamp-2 break-words'>
                    {currentEmployee.employee.sexe === 'F'
                      ? 'Féminin'
                      : 'Masculin'}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Localité</p>
                  <p>{currentEmployee.employee.localite}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>
                    Date de naissance
                  </p>
                  <p className='line-clamp-2 break-words'>
                    {format(
                      fromUnixTime(currentEmployee.employee.dateNaissance),
                      'd MMMM y'
                    )}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>
                    Lieu de naissance
                  </p>
                  <p className='line-clamp-3 break-words'>
                    {capitalize(currentEmployee.employee.lieuNaissance)}
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-2 p-4 rounded-lg border border-secondary'>
              <h4 className='font-medium'>Détails emploi</h4>
              <div className='flex justify-between gap-4 *:max-w-48 *:min-w-32'>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Direction</p>
                  <p className='line-clamp-2 break-words'>
                    {capitalize(currentEmployee.employee.direction)}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Csp</p>
                  <p className='line-clamp-2 break-words'>
                    {currentEmployee.employee.csp}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>
                    Département
                  </p>
                  <p className='line-clamp-2 break-words'>N/A</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-nowrap'>Status</p>
                  <p
                    className={cn(
                      'line-clamp-2 break-words uppercase font-medium',
                      isActive ? 'text-green-400' : 'text-red-400'
                    )}
                  >
                    {isActive ? 'Actif' : 'Inactif'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
