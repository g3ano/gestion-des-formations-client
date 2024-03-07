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
    <div className='flex gap-1 h-full'>
      <div
        className={cn('bg-card h-full flex flex-col gap-6 py-6 rounded-r', {
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
                            'min-w-72 py-2 isolate relative rounded-lg cursor-pointer',
                            {
                              'bg-secondary':
                                employee.id === currentEmployee.employee.id,
                            }
                          )}
                          onClick={() => setCurrentEmployee({ employee })}
                        >
                          {employee.id === currentEmployee.employee.id && (
                            <div className='absolute inset-0 ps-0.5 py-0.5 -z-10 bg-secondary -translate-x-6 '>
                              <div className='w-0.5 h-full bg-primary rounded-lg'></div>
                            </div>
                          )}

                          <div className='flex items-center gap-4'>
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
                                    <div className='max-w-40 leading-5 text-center'>
                                      Cet employé est engagé dans l&apos;action
                                      en cours
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>

                            <div className='flex-1 flex flex-col justify-center'>
                              <div className='line-clamp-1 pe-4 flex items-center gap-1 text-nowrap'>
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
                            'min-w-72 py-2 isolate relative rounded-lg cursor-pointer',
                            {
                              'bg-secondary':
                                employee.id === currentEmployee.employee.id,
                            }
                          )}
                          onClick={() => setCurrentEmployee({ employee })}
                        >
                          {employee.id === currentEmployee.employee.id && (
                            <div className='absolute inset-0 ps-0.5 py-0.5 -z-10 bg-secondary -translate-x-6 '>
                              <div className='w-0.5 h-full bg-primary rounded-lg'></div>
                            </div>
                          )}

                          <div className='flex items-center gap-4'>
                            <div className='size-12 bg-background flex items-center justify-center relative rounded-sm p-2'>
                              <p className='font-medium uppercase'>
                                {employee.nom.slice(0, 1)}
                              </p>
                              <p className='font-medium uppercase'>
                                {employee.prenom.slice(0, 1)}
                              </p>
                            </div>

                            <div className='flex-1 flex flex-col justify-center'>
                              <div className='line-clamp-1 pe-4 flex items-center gap-1 text-nowrap'>
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
            <p>Aucun employé n&apos;est trouvé</p>
          )}
        </ScrollArea>
      </div>
      {employees.length ? (
        <ScrollArea className='flex-1 bg-card w-full h-full rounded-r-lg rounded-l p-6'>
          <div className='space-y-4'>
            <div className='text-xl flex flex-col'>
              <div className='text-nowrap space-x-1'>
                <span className='select-none'>Matricule</span>
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
                  {currentEmployee.employee.isActive && (
                    <div>
                      <p className='text-muted-foreground text-nowrap'>
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
                    <p className='text-muted-foreground text-nowrap'>
                      Localité
                    </p>
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
                    <p className='text-muted-foreground text-nowrap'>
                      Direction
                    </p>
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
