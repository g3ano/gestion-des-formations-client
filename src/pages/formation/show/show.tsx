import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { queryClient } from '@/lib/router';
import { capitalize, cn } from '@/lib/utils';
import { Formation, deleteFormations } from '@/pages/formation';
import { useMutation } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { Loader2, MoreVertical, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function FormationShow({ row }: { row: Row<Formation> }) {
  return (
    <div className='w-full flex rounded-lg'>
      <ScrollArea className='-mb-0.5 rounded-lg drop-shadow w-full'>
        <div className='flex flex-col justify-between gap-1'>
          <div className='bg-card rounded-[5px] space-y-1.5'>
            <div className='flex min-h-12 items-center justify-between bg-accent px-4 py-1 absolute inset-x-0 top-0 z-10 rounded-t-lg'>
              <div className=''>
                <FormationPreviewMenu row={row} />
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='hover:text-primary-foreground'
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
              <p className='font-medium line-clamp-2 pb-1 text-muted-foreground'>
                Intitule
              </p>
              <p className='line-clamp-2 pt-1 pb-4'>
                {capitalize(row.getValue('intitule'))}
              </p>
            </div>
          </div>
          <div className='bg-card rounded-[5px] p-4 space-y-1.5'>
            <p className='font-medium line-clamp-2 pb-1 text-muted-foreground'>
              Formation
            </p>
            <Presentation
              column='lieu'
              rowValue={row.getValue('lieu')}
              inline
            />
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
              column='code formation'
              rowValue={row.getValue('codeFormation')}
              inline
            />
            <Presentation
              column='code domaine'
              rowValue={row.getValue('codeDomaine')}
              isCapitalized={false}
              inline
            />
          </div>
          <div className='bg-card rounded-[5px] p-4 space-y-1.5'>
            <Presentation
              column='organisme'
              rowValue={row.getValue('organisme')}
              multiline
            />
            <Presentation
              column='categorie'
              rowValue={row.getValue('categorie')}
              multiline
            />
            <Presentation
              column='type'
              rowValue={row.getValue('type')}
              multiline
            />
            <Presentation
              column='domaine'
              rowValue={row.getValue('domaine')}
              multiline
            />
          </div>
          <div className='bg-card rounded-[5px] p-4 space-y-1.5'>
            <p className='font-medium line-clamp-2 pb-1 text-muted-foreground'>
              Effectif à former
            </p>
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
              rowValue={row.getValue('HJ')}
              isCapitalized={false}
              inline
            />
          </div>
          <div className='bg-card rounded-[5px] p-4 space-y-1.5'>
            <p className='font-medium line-clamp-2 pb-1 text-muted-foreground'>
              Coût
            </p>
            <Presentation
              column='Pédagogiques'
              rowValue={row.getValue('pedagogiques')}
              isCapitalized={false}
              inline
            />
            <Presentation
              column='Hébergement restauration'
              rowValue={row.getValue('hebergementRestauration')}
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
              rowValue={row.getValue('autresCharges')}
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
          <div className='bg-card rounded-b-lg rounded-t-[5px] p-4 space-y-1.5 mb-0.5'>
            <p className='font-medium line-clamp-2 text-muted-foreground'>
              Observation
            </p>
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
  multiline = false,
}: {
  column: string;
  rowValue: string;
  isCapitalized?: boolean;
  isUpperCase?: boolean;
  inline?: boolean;
  multiline?: boolean;
}) => (
  <div
    className={cn('flex flex-col', {
      'flex-row justify-between gap-4': inline,
      'flex-col gap-1': multiline,
    })}
  >
    <p className='flex-1 line-clamp-1 2xl:line-clamp-none text-muted-foreground'>
      {capitalize(column)}
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

const FormationPreviewMenu = ({ row }: { row: Row<Formation> }) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (ids: (number | string)[]) => deleteFormations(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
      row.toggleExpanded();
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            edge='left'
          >
            <Icon
              render={MoreVertical}
              size='sm'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className='w-64'
        >
          <DropdownMenuItem
            inset
            asChild
          >
            <Link to={`/formations/${row.id}/edit`}>Modifier</Link>
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
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            inset
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={open}
        onOpenChange={(open) => setOpen(open)}
      >
        <DialogContent className='max-w-xl'>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer?</DialogTitle>
          </DialogHeader>
          <div className='mt-6 mb-8'>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement la formation.
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
    </>
  );
};
