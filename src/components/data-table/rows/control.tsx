import { Table } from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTableContext } from '@/lib/contexts/data-table-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Download, Loader2, Trash, X } from 'lucide-react';

interface TableControlsProps<TData> {
  table: Table<TData>;
  queryFn: (ids: (number | string)[]) => Promise<any>;
  queryKey: string;
}

function Control<TData>({
  table,
  queryFn,
  queryKey,
}: TableControlsProps<TData>) {
  const { rowSelection, setRowSelection } = DataTableContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (ids: (number | string)[]) => queryFn(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setRowSelection({});
      console.log('delete succeeded');
    },
  });

  return (
    <div className='flex items-center gap-1 animate-in slide-in-from-bottom-10 duration-100 ease-in-out'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              onClick={() => table.resetRowSelection()}
            >
              <Icon
                render={Download}
                size='sm'
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Annuler la sélection actuelle</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              onClick={() => table.resetRowSelection()}
            >
              <Icon
                render={X}
                size='sm'
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Télécharger les lignes sélectionnées (pdf)
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='destructive'
              onClick={() => {
                const ids = Object.keys(rowSelection);
                mutation.mutate(ids);
              }}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Icon
                  render={Loader2}
                  className='animate-spin'
                />
              ) : (
                <Icon
                  render={Trash}
                  size='sm'
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Supprimer les lignes sélectionnées</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Control;
