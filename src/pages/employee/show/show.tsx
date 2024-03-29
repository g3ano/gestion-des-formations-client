import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { queryClient } from '@/lib/router';
import { capitalize, cn } from '@/lib/utils';
import { Employee, deleteEmployees } from '@/pages/employee';
import { useMutation } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { format, fromUnixTime } from 'date-fns';
import { Loader2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface EmployeeShowProps {
  row: Row<Employee>;
  currentWidth: number;
}

function EmployeeShow({ row, currentWidth }: EmployeeShowProps) {
  return (
    <div
      className={cn(
        'min-h-40 w-full overflow-hidden focus:rounded-lg focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-accent-foreground'
      )}
      style={{
        width: `${currentWidth}px`,
      }}
    >
      <div className='group flex flex-col justify-center gap-6 px-20 py-8'>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-4'>
            <div className='flex size-12 items-center justify-center space-x-1 rounded-lg bg-accent shadow-inner'>
              <span className='text-xl font-medium'>
                {row.getValue<string>('nom').slice(0, 1).toLocaleUpperCase()}
                {row.getValue<string>('prenom').slice(0, 1).toLocaleUpperCase()}
              </span>
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
          <div className='mr-5 space-x-1'>
            <EmployeePreviewMenu row={row} />
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
            <Presentation column='CSP' rowValue={row.getValue('csp')} />
          </div>
          <div>
            <Presentation
              column='sexe'
              rowValue={row.getValue('sexe') === 'M' ? 'Masculine' : 'Feminine'}
            />
            <Presentation
              column='date de naissance'
              rowValue={format(
                fromUnixTime(row.getValue('dateNaissance')),
                'dd/MM/y'
              )}
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
      {isCapitalized && <p className='line-clamp-2'>{capitalize(rowValue)}</p>}
      {!isCapitalized && (
        <p className='line-clamp-1 break-before-all'>{rowValue}</p>
      )}
    </div>
  );
}

const EmployeePreviewMenu = ({ row }: { row: Row<Employee> }) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (ids: (number | string)[]) => deleteEmployees(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      row.toggleExpanded();
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost' edge='left'>
            <Icon render={MoreVertical} size='sm' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start' className='w-64'>
          <DropdownMenuItem inset asChild>
            <Link to={`/employees/${row.id}/edit`}>Modifier</Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              if (row.getIsSelected()) {
                row.toggleSelected(false);
              } else {
                row.toggleSelected(true);
              }
            }}
            inset
          >
            {row.getIsSelected() ? 'Désélectionner' : 'Sélectionner'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)} inset>
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className='max-w-xl'>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer?</DialogTitle>
          </DialogHeader>
          <div className='mb-8 mt-6'>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement l&apos;employée.
          </div>
          <DialogFooter>
            <Button
              autoFocus
              variant='secondary'
              className='uppercase'
              onClick={() => setOpen((prev) => !prev)}
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                mutation.mutate([row.id]);
                if (mutation.isSuccess) {
                  setOpen((prev) => !prev);
                }
              }}
              disabled={mutation.isPending}
              className='pl-3'
            >
              <div className='flex items-center gap-2'>
                {mutation.isPending && (
                  <Icon render={Loader2} className='animate-spin' />
                )}
                Supprimer
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
