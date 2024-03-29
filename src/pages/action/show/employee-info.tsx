import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { capitalize, cn } from '@/lib/utils';
import SectionTitle from '@/pages/action/components/section-title';
import { Employee } from '@/pages/employee';
import { format, fromUnixTime } from 'date-fns';
import { useMemo, useState } from 'react';

function EmployeeInfo({ employees }: { employees: Employee[] }) {
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(
    employees[0]
  );

  const employeesStatus: {
    activeEmployees: Employee[];
    inactiveEmployees: Employee[];
  } = useMemo(() => {
    const activeEmployees = employees.filter(
      (employee) => employee.employee.isActive
    );
    const inactiveEmployees = employees.filter(
      (employee) => !employee.employee.isActive
    );

    return {
      activeEmployees,
      inactiveEmployees,
    };
  }, [employees]);

  return (
    <div className='flex h-full gap-1'>
      <div
        className={cn('flex h-full flex-col gap-6 rounded-r bg-card py-6', {
          'w-full rounded-lg': !employees.length,
        })}
      >
        <div className='px-6'>
          <h3 className='text-2xl font-bold'>Employées</h3>
        </div>
        <ScrollArea className='h-full w-full'>
          {employees.length ? (
            <>
              {employeesStatus.activeEmployees.length ? (
                <>
                  <SectionTitle>ACTIF</SectionTitle>
                  <div className='space-y-1 px-6'>
                    {employees.map(({ employee }) =>
                      employee.isActive ? (
                        <div
                          key={employee.id}
                          className={cn(
                            'relative isolate min-w-72 cursor-pointer rounded-lg py-2',
                            {
                              'bg-secondary':
                                employee.id === currentEmployee.employee.id,
                            }
                          )}
                          onClick={() => setCurrentEmployee({ employee })}
                        >
                          {employee.id === currentEmployee.employee.id && (
                            <div className='absolute inset-0 -z-10 -translate-x-6 bg-secondary py-0.5 ps-0.5 '>
                              <div className='h-full w-0.5 rounded-lg bg-primary'></div>
                            </div>
                          )}

                          <div className='flex items-center gap-4'>
                            <div className='relative flex size-12 items-center justify-center rounded-sm bg-background p-2'>
                              <p className='font-medium uppercase'>
                                {employee.nom.slice(0, 1)}
                              </p>
                              <p className='font-medium uppercase'>
                                {employee.prenom.slice(0, 1)}
                              </p>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className='absolute bottom-0 right-0 z-10 size-2 rounded-full bg-green-500'></div>
                                  </TooltipTrigger>
                                  <TooltipContent side='right' sideOffset={20}>
                                    <div className='max-w-40 text-center leading-5'>
                                      Cet employé est engagé dans l&apos;action
                                      en cours
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>

                            <div className='flex flex-1 flex-col justify-center'>
                              <div className='line-clamp-1 flex items-center gap-1 text-nowrap pe-4'>
                                <p>{employee.nom}</p>
                                <p>{employee.prenom}</p>
                              </div>
                              <p className='text-muted-foreground'>
                                {employee.matricule}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </>
              ) : null}
              {employeesStatus.inactiveEmployees.length ? (
                <>
                  <SectionTitle
                    className={
                      employeesStatus.activeEmployees.length ? 'my-4' : ''
                    }
                  >
                    INACTIF
                  </SectionTitle>
                  <div className='space-y-1 px-6'>
                    {employees.map(({ employee }) =>
                      !employee.isActive ? (
                        <div
                          key={employee.id}
                          className={cn(
                            'relative isolate min-w-72 cursor-pointer rounded-lg py-2',
                            {
                              'bg-secondary':
                                employee.id === currentEmployee.employee.id,
                            }
                          )}
                          onClick={() => setCurrentEmployee({ employee })}
                        >
                          {employee.id === currentEmployee.employee.id && (
                            <div className='absolute inset-0 -z-10 -translate-x-6 bg-secondary py-0.5 ps-0.5 '>
                              <div className='h-full w-0.5 rounded-lg bg-primary'></div>
                            </div>
                          )}

                          <div className='flex items-center gap-4'>
                            <div className='relative flex size-12 items-center justify-center rounded-sm bg-background p-2'>
                              <p className='font-medium uppercase'>
                                {employee.nom.slice(0, 1)}
                              </p>
                              <p className='font-medium uppercase'>
                                {employee.prenom.slice(0, 1)}
                              </p>
                            </div>

                            <div className='flex flex-1 flex-col justify-center'>
                              <div className='line-clamp-1 flex items-center gap-1 text-nowrap pe-4'>
                                <p>{employee.nom}</p>
                                <p>{employee.prenom}</p>
                              </div>
                              <p className='text-muted-foreground'>
                                {employee.matricule}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <p className='px-6'>Aucun employé n&apos;est trouvé</p>
          )}
        </ScrollArea>
      </div>
      {employees.length ? (
        <ScrollArea className='h-full w-full flex-1 rounded-l rounded-r-lg bg-card p-6'>
          <div className='space-y-4'>
            <div className='flex flex-col text-xl'>
              <div className='space-x-1 text-nowrap'>
                <span className='select-none'>Matricule</span>
                <span className='font-medium'>
                  {currentEmployee.employee.matricule}
                </span>
              </div>
              <div className='text-base text-muted-foreground'>
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
              <div className='flex-1 space-y-2 rounded-lg border border-secondary p-4'>
                <h4 className='font-medium'>Détails General</h4>
                <div className='flex justify-between gap-4 *:min-w-32 *:max-w-48'>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>Nom</p>
                    <p className='line-clamp-2 break-words'>
                      {capitalize(currentEmployee.employee.nom)}
                    </p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>Prenom</p>
                    <p className='line-clamp-2'>
                      {capitalize(currentEmployee.employee.prenom)}
                    </p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>
                      Adresse email
                    </p>
                    <p className='line-clamp-2 break-words'>
                      {currentEmployee.employee.email}
                    </p>
                  </div>
                  {currentEmployee.employee.isActive && (
                    <div>
                      <p className='text-nowrap text-muted-foreground'>
                        Date de début
                      </p>
                      {currentEmployee.employee.startedAt ? (
                        <p className='line-clamp-2 break-words'>
                          {format(
                            fromUnixTime(currentEmployee.employee.startedAt),
                            'd MMMM y'
                          )}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              <div className='space-y-2 rounded-lg border border-secondary p-4'>
                <h4 className='font-medium'>Détails personnel</h4>
                <div className='flex justify-between gap-4 *:min-w-32 *:max-w-48'>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>Sexe</p>
                    <p className='line-clamp-2 break-words'>
                      {currentEmployee.employee.sexe === 'F'
                        ? 'Féminin'
                        : 'Masculin'}
                    </p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>
                      Localité
                    </p>
                    <p>{currentEmployee.employee.localite}</p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>
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
                    <p className='text-nowrap text-muted-foreground'>
                      Lieu de naissance
                    </p>
                    <p className='line-clamp-3 break-words'>
                      {capitalize(currentEmployee.employee.lieuNaissance)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-2 rounded-lg border border-secondary p-4'>
                <h4 className='font-medium'>Détails emploi</h4>
                <div className='flex justify-between gap-4 *:min-w-32 *:max-w-48'>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>
                      Direction
                    </p>
                    <p className='line-clamp-2 break-words'>
                      {capitalize(currentEmployee.employee.direction)}
                    </p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>Csp</p>
                    <p className='line-clamp-2 break-words'>
                      {currentEmployee.employee.csp}
                    </p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>
                      Département
                    </p>
                    <p className='line-clamp-2 break-words'>N/A</p>
                  </div>
                  <div>
                    <p className='text-nowrap text-muted-foreground'>Status</p>
                    <p
                      className={cn(
                        'line-clamp-2 break-words font-medium uppercase',
                        currentEmployee.employee.isActive
                          ? 'text-green-400'
                          : 'text-red-400'
                      )}
                    >
                      {currentEmployee.employee.isActive ? 'Actif' : 'Inactif'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}
export default EmployeeInfo;
