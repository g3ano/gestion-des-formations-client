import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { View } from '@/pages/action';
import FilterActions from '@/pages/action/components/filter-action';
import ActionGroup from '@/pages/action/layout/group';
import ActionSingle from '@/pages/action/layout/single';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function Actions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const view = searchParams.get('view') as View;

  useEffect(() => {
    if (view !== 'group' && view !== 'single') {
      navigate('/?view=group');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <Page
      title='Actions des Formations'
      actions={
        <div className='flex items-center justify-end gap-2'>
          <div className='flex items-center gap-4'>
            <div className='flex h-9 items-center gap-1 rounded-lg  bg-secondary p-1'>
              <Button
                size='icon'
                variant='secondary'
                className={cn('h-full hover:bg-primary', {
                  'bg-card': view === 'single',
                })}
                onClick={() => setSearchParams({ view: 'single' })}
              >
                <Icon render={LayoutList} size='sm' />
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className={cn('h-full hover:bg-primary', {
                  'bg-popover': view === 'group',
                })}
                onClick={() => setSearchParams({ view: 'group' })}
              >
                <Icon render={LayoutGrid} size='sm' />
              </Button>
            </div>
            <Button asChild>
              <Link to='/actions/create'>
                <span>Nouveau Action</span>
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full'>
        <div className='flex h-full gap-4 pb-2'>
          <div className='h-full max-w-fit basis-1/12 rounded-lg lg:basis-1/4'>
            <FilterActions />
          </div>
          <ScrollArea className='basis-11/12 rounded-lg'>
            <div className='h-full basis-4/6 lg:basis-4/5'>
              <div className='grid grid-cols-12 gap-4'>
                {view === 'group' && <ActionGroup />}
                {view === 'single' && <ActionSingle />}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Page>
  );
}
export default Actions;
