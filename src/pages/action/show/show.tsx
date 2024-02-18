import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getAction } from '@/pages/action';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

function ActionPreview() {
  const { actionId } = useParams() as { actionId: string };

  const {
    data: action,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ['employees', { actionId }, 'edit'],
    queryFn: () => getAction(actionId),
  });

  return (
    <Page
      title='Action de Formation'
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center gap-4'>
            <Button variant='outline'>Modifier</Button>
            <Button>
              <span>Nouveau Action</span>
            </Button>
          </div>
        </div>
      }
    >
      <div>
        <div className='mb-8'>Action Preview</div>
        {isPending && (
          <div className='flex items-center gap-2'>
            <Icon
              render={Loader2}
              size='sm'
              className='animate-spin'
            />
            <div>Loading...</div>
          </div>
        )}

        {isSuccess && (
          <div>
            <div>{action.action.id}</div>
            <div>
              {action.relationships.formation.relationships.intitule.intitule}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export default ActionPreview;
