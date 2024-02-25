import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import axiosClient from '@/lib/axios';
import { queryClient } from '@/lib/router';
import { cn } from '@/lib/utils';
import FilterActions from '@/pages/action/show/filter-action';
import ActionGroup from '@/pages/action/show/group';
import ActionSingle from '@/pages/action/show/single';
import { useMutation } from '@tanstack/react-query';
import { addDays, getUnixTime, subDays } from 'date-fns';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type View = 'group' | 'single' | null;

function Actions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const view = searchParams.get('view') as View;

  useEffect(() => {
    if (view !== 'group' && view !== 'single') {
      navigate('/actions?view=group');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const mutation = useMutation({
    mutationFn: async (body: unknown) => {
      const res: unknown = await axiosClient.post('/actions', body);
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['actions'],
      });
    },
  });

  const handleActionCreate = () => {
    mutation.mutate({
      action: {
        formationId: Math.round(Math.random() * 100) + 1,
        dateDebut: getUnixTime(
          subDays(new Date(), Math.round(Math.random() * 9) + 1)
        ),
        dateFin: getUnixTime(
          addDays(new Date(), Math.round(Math.random() * 9) + 1)
        ),
        prevision: 'Lorem ipsum dolor',
      },
      participants: [
        {
          employeeId: Math.round(Math.random() * 100) + 1,
          observation: 'Lorem ipsum dolor sit',
        },
        {
          employeeId: Math.round(Math.random() * 100) + 1,
          observation: 'Lorem ipsum dolor sit',
        },
        {
          employeeId: Math.round(Math.random() * 100) + 1,
          observation: 'Lorem ipsum dolor sit',
        },
      ],
    });
  };

  return (
    <Page
      title='Actions des Formations'
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1 bg-secondary p-1  h-9 rounded-lg'>
              <Button
                size='icon'
                variant='secondary'
                className={cn('h-full', {
                  'bg-card': view === 'single',
                })}
                onClick={() => setSearchParams({ view: 'single' })}
              >
                <Icon
                  render={LayoutList}
                  size='sm'
                />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className={cn('h-full', {
                  'bg-popover': view === 'group',
                })}
                onClick={() => setSearchParams({ view: 'group' })}
              >
                <Icon
                  render={LayoutGrid}
                  size='sm'
                />
              </Button>
            </div>
            <Button onClick={handleActionCreate}>
              <span>Nouveau Action</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full'>
        <div className='flex gap-4'>
          <div className='rounded-lg basis-2/6 lg:basis-1/5 h-full'>
            <FilterActions />
          </div>
          <div className='h-fit grid grid-cols-12 basis-4/6 lg:basis-4/5 gap-4 pb-8'>
            {view === 'group' && <ActionGroup />}
            {view === 'single' && <ActionSingle />}
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Actions;
