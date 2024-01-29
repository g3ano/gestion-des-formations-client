import SideBar from '@/components/layout/default/side-bar';
import { DataTableProvider } from '@/lib/contexts/data-table-context';
import { TableContextProvider } from '@/lib/contexts/table-context';
import { FormationsCreateProvider } from '@/pages/formations/create';
import { Outlet, useNavigation } from 'react-router-dom';

export const Default = () => {
  const { state } = useNavigation();

  if (state === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-secondary text-foreground w-full'>
      <div className='min-h-full flex items-stretch'>
        <div className='shadow'>
          <SideBar />
        </div>
        <div className='flex-1 min-w-0 ml-16'>
          <DataTableProvider>
            <TableContextProvider>
              <FormationsCreateProvider>
                <Outlet />
              </FormationsCreateProvider>
            </TableContextProvider>
          </DataTableProvider>
        </div>
      </div>
    </div>
  );
};
