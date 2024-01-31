import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { capitalize, cn } from '@/lib/utils';
import { Formation } from '@/pages/formation';
import { Row } from '@tanstack/react-table';
import { PenLine, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FormationShow({ row }: { row: Row<Formation> }) {
  return (
    <div className='w-full flex rounded-lg'>
      <ScrollArea className='-mb-0.5'>
        <div className='flex flex-col justify-between gap-4'>
          <div className='bg-background rounded-lg space-y-1.5 shadow'>
            <div className='flex min-h-12 items-center justify-between bg-primary text-primary-foreground px-4 py-1 absolute inset-x-0 top-0 z-10 rounded-t-lg shadow'>
              <Button
                variant='ghost'
                size='icon'
                className='text-primary-foreground hover:text-primary-foreground'
                onClick={() => row.toggleExpanded(false)}
                edge='left'
                asChild
              >
                <Link to={`/formations/${row.id}/edit`}>
                  <Icon
                    render={PenLine}
                    size='sm'
                  />
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-primary-foreground hover:text-primary-foreground'
                onClick={() => row.toggleExpanded(false)}
                edge='right'
              >
                <Icon
                  render={X}
                  size='sm'
                />
              </Button>
            </div>
            <div className='p-4 pt-14'>
              <p className='font-medium line-clamp-2 pb-1'>Intitule</p>
              <p className='line-clamp-2 pt-1 pb-4'>
                {row.getValue('intitule')}
              </p>
            </div>
          </div>
          <div className='bg-background rounded-lg p-4 space-y-1.5 shadow'>
            <p className='font-medium line-clamp-2 pb-1'>Formation</p>
            <Presentation
              column='structure'
              rowValue={row.getValue('structure')}
              inline
              isUpperCase
            />
            <Presentation
              column='mode'
              rowValue={row.getValue('mode')}
              inline
              isUpperCase
            />
            <Presentation
              column='lieu'
              rowValue={row.getValue('lieu')}
              inline
            />
            <Presentation
              column='code formation'
              rowValue={row.getValue('code_formation')}
              inline
            />
            <Presentation
              column='organisme'
              rowValue={row.getValue('organisme')}
              inline
            />
            <Presentation
              column='type'
              rowValue={row.getValue('type')}
              inline
            />
            <Presentation
              column='domaine'
              rowValue={row.getValue('domaine')}
              inline
              isUpperCase
            />
            <Presentation
              column='categorie'
              rowValue={row.getValue('categorie')}
              inline
            />
            <Presentation
              column='code domaine'
              rowValue={row.getValue('code_domaine')}
              isCapitalized={false}
              inline
            />
          </div>
          <div className='bg-background rounded-lg p-4 space-y-1.5 shadow'>
            <p className='font-medium line-clamp-2 pb-1'>Effectif à former</p>
            <Presentation
              column='durree'
              rowValue={row.getValue('durree')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='effectif'
              rowValue={row.getValue('effectif')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='H/J'
              rowValue={row.getValue('h_j')}
              isCapitalized={false}
              inline
            />
          </div>
          <div className='bg-background rounded-lg p-4 space-y-1.5 shadow'>
            <p className='font-medium line-clamp-2 pb-1'>Coût</p>
            <Presentation
              column='Pédagogiques'
              rowValue={row.getValue('pedagogiques')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='Hébergement restauration'
              rowValue={row.getValue('hebergement_restauration')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='transport'
              rowValue={row.getValue('transport')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='autres charges'
              rowValue={row.getValue('autres_charges')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='Présalaire'
              rowValue={row.getValue('presalaire')}
              isCapitalized={false}
              inline
            />
          </div>
          <div className='bg-background rounded-lg p-4 space-y-1.5 shadow mb-0.5'>
            <p className='font-medium line-clamp-2'>Observation</p>
            <p className='line-clamp-4 pt-1'>
              {row.getValue('observation')
                ? row.getValue('observation')
                : 'Aucun observation trouve'}
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

const Presentation = ({
  column,
  rowValue,
  isCapitalized = true,
  isUpperCase = false,
  inline = false,
}: {
  column: string;
  rowValue: string;
  isCapitalized?: boolean;
  isUpperCase?: boolean;
  inline?: boolean;
}) => (
  <div
    className={cn('flex flex-col', {
      'flex-row justify-between gap-4': inline,
    })}
  >
    <p className='flex-1 line-clamp-1 2xl:line-clamp-none'>
      {capitalize(column)}:
    </p>
    {isCapitalized && (
      <p className={cn('line-clamp-2 flex-1', { uppercase: isUpperCase })}>
        {capitalize(rowValue)}
      </p>
    )}
    {!isCapitalized && (
      <p className={cn('line-clamp-2 flex-1', { uppercase: isUpperCase })}>
        {rowValue}
      </p>
    )}
  </div>
);
