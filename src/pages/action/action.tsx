import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import axiosClient from '@/lib/axios';
import { queryClient } from '@/lib/router';
import { cn } from '@/lib/utils';
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
      return navigate('/actions?view=group');
    }
  }, [navigate, view]);

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
      <div className='h-full mt-8'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='rounded-lg col-span-4 lg:col-span-2 h-full'>
            <Button
              className='w-full justify-start'
              variant='ghost'
            >
              Latest
            </Button>
          </div>
          <div className='grid grid-cols-12 col-span-8 lg:col-span-10 gap-4'>
            {view === 'group' && <ActionGroup />}
            {view === 'single' && <ActionSingle />}
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Actions;
