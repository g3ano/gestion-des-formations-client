import Icon from '@/components/ui/icon';
import { capitalize, cn } from '@/lib/utils';
import { Employee } from '@/pages/employees';
import { Row } from '@tanstack/react-table';
import { UserRound } from 'lucide-react';

interface ShowProps {
  row: Row<Employee>;
}

export function Preview({ row }: ShowProps) {
  return (
    <div
      className={cn(
        'min-h-40 flex flex-col justify-center gap-6 px-4 py-8 w-full overflow-hidden focus:outline-offset-0 focus:outline focus:outline-1 focus:outline-accent-foreground focus:rounded-lg pl-[75px]'
      )}
    >
      <div className='flex items-center gap-4'>
        <div className='size-12 bg-accent rounded-lg flex items-center justify-center shadow-inner'>
          <Icon
            render={UserRound}
            size='sm'
          />
        </div>
        <div className='-space-y-1'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold uppercase'>{`${row.getValue(
              'nom'
            )} ${row.getValue('prenom')}`}</p>
          </div>
          <p>{row.getValue('email')}</p>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row'>
        <div className='sm:pe-20'>
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
        <div className='hidden sm:inline-block min-h-10 bg-foreground/10 w-px'></div>
        <div className='sm:ps-20'>
          <Presentation
            column='sexe'
            rowValue={row.getValue('sexe') === 'M' ? 'Masculine' : 'Feminine'}
          />
          <Presentation
            column='date de naissance'
            rowValue={row.getValue('date_naissance')}
          />
          <Presentation
            column='lieu de naissance'
            rowValue={row.getValue('lieu_naissance')}
          />
        </div>
      </div>
    </div>
  );
}

const Presentation = ({
  column,
  rowValue,
  isCapitalized = true,
}: {
  column: string;
  rowValue: string;
  isCapitalized?: boolean;
}) => (
  <div className='flex items-center'>
    <p className='min-w-48 font-semibold'>{capitalize(column)}</p>
    {isCapitalized && <p className='line-clamp-1'>{capitalize(rowValue)}</p>}
    {!isCapitalized && <p className='line-clamp-1'>{rowValue}</p>}
  </div>
);
