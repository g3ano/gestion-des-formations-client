import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { queryClient } from '@/lib/router';
import { capitalize, cn } from '@/lib/utils';
import { Employee, deleteEmployees } from '@/pages/employee';
import { useMutation } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { Loader2, Pencil, Trash2, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmployeeShowProps {
  row: Row<Employee>;
  currentWidth: number;
}

function EmployeeShow({ row, currentWidth }: EmployeeShowProps) {
  const mutation = useMutation({
    mutationFn: (ids: (number | string)[]) => deleteEmployees(ids),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return (
    <div
      className={cn(
        'min-h-40 w-full overflow-hidden focus:outline-offset-0 focus:outline focus:outline-1 focus:outline-accent-foreground focus:rounded-lg'
      )}
      style={{
        width: `${currentWidth}px`,
      }}
    >
      <div className='flex flex-col justify-center gap-6 px-20 py-8 group'>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-4'>
            <div className='size-12 bg-accent rounded-lg flex items-center justify-center shadow-inner'>
              <Icon
                render={UserRound}
                size='sm'
              />
            </div>
            <div className='-space-y-1'>
              <div className='flex items-center gap-1'>
                <p className='font-medium uppercase'>{`${row.getValue<string>(
                  'nom'
                )} ${row.getValue<string>('prenom')}`}</p>
              </div>
              <p>{row.getValue('email')}</p>
            </div>
          </div>
          <div className='mr-5 space-x-1 hidden group-hover:block'>
            <Button
              asChild
              size='icon'
              variant='ghost'
            >
              <Link to='/'>
                <Icon
                  render={Pencil}
                  size='sm'
                />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  className='hover:bg-destructive'
                >
                  <Icon
                    render={Trash2}
                    size='sm'
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-xl'>
                <DialogHeader>
                  <DialogTitle>Êtes-vous sûr de vouloir supprimer?</DialogTitle>
                </DialogHeader>
                <div className='mt-6 mb-8'>
                  Cette action ne peut pas être annulée. Cela supprimera
                  définitivement l&apos;employée.
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      autoFocus
                      variant='secondary'
                      className='uppercase'
                    >
                      Annuler
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      mutation.mutate([row.id]);
                    }}
                    disabled={mutation.isPending}
                    className='pl-3'
                  >
                    <div className='flex items-center gap-2'>
                      {mutation.isPending && (
                        <Icon
                          render={Loader2}
                          className='animate-spin'
                        />
                      )}
                      Supprimer
                    </div>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <div className='w-1/2'>
            <Presentation
              column='matricule'
              rowValue={row.getValue('matricule')}
            />
            <Presentation
              column='direction'
              rowValue={row.getValue('direction')}
            />
            <Presentation
              column='localité'
              rowValue={row.getValue('localite')}
            />
            <Presentation
              column='CSP'
              rowValue={row.getValue('csp')}
            />
          </div>
          <div>
            <Presentation
              column='sexe'
              rowValue={row.getValue('sexe') === 'M' ? 'Masculine' : 'Feminine'}
            />
            <Presentation
              column='date de naissance'
              rowValue={row.getValue('dateNaissance')}
            />
            <Presentation
              column='lieu de naissance'
              rowValue={row.getValue('lieuNaissance')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeShow;

function Presentation({
  column,
  rowValue,
  isCapitalized = true,
}: {
  column: string;
  rowValue: string;
  isCapitalized?: boolean;
}) {
  return (
    <div className='flex items-center'>
      <p className='min-w-48 font-medium'>{capitalize(column)}</p>
      {isCapitalized && <p className='line-clamp-1'>{capitalize(rowValue)}</p>}
      {!isCapitalized && <p className='line-clamp-1'>{rowValue}</p>}
    </div>
  );
}
