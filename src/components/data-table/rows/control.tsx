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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/lib/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { Download, Loader2, Trash, X } from 'lucide-react';

interface TableControlsProps<TData> {
  table: Table<TData>;
  queryFn: (
    ids: (number | string)[]
  ) => Promise<{ message: string; effectedRows: number }>;
  queryKey: string;
}

function Control<TData>({
  table,
  queryFn,
  queryKey,
}: TableControlsProps<TData>) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (ids: (number | string)[]) => queryFn(ids),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [queryKey] });
      table.resetRowSelection();
      table.resetExpanded();
      toast({
        title: `${data.effectedRows} ${data.message}`,
      });
    },
  });
  const actionElements = Object.keys(table.getState().rowSelection).length;

  return (
    <div className='flex items-center gap-1 duration-100 ease-in-out animate-in slide-in-from-bottom-10'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' onClick={() => {}}>
              <Icon render={Download} size='sm' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Annuler la sélection actuelle</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' onClick={() => table.resetRowSelection()}>
              <Icon render={X} size='sm' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Télécharger les lignes sélectionnées (pdf)
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='icon' variant='destructive'>
            <Icon render={Trash} size='sm' />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-xl'>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer?</DialogTitle>
          </DialogHeader>
          <div className='mb-8 mt-6 text-pretty'>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement{' '}
            <span className='font-semibold'>{actionElements}</span>{' '}
            {actionElements > 1
              ? queryKey
              : queryKey.slice(0, queryKey.length - 1)}
            .
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button autoFocus variant='secondary' className='uppercase'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                const ids = Object.keys(table.getState().rowSelection);
                mutation.mutate(ids);
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
    </div>
  );
}

export default Control;
