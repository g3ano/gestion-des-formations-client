import { TableContextProvider } from '@/lib/contexts/table-context';
import { FormationCreateProvider } from '@/pages/formation/create';
import { FormationDataTableProvider } from '@/pages/formation';
import { EmployeeDataTableProvider } from '@/pages/employee';
import { Outlet, useNavigation } from 'react-router-dom';
import { SideBar } from '@/components/layout/default';
import Icon from '@/components/ui/icon';
import { Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

function Default() {
  const { state } = useNavigation();

  if (state === 'loading') {
    return (
      <div className='fixed top-0 left-1/2 -translate-x-1/2 mt-8'>
        <div className='flex items-center gap-2'>
          <Icon
            render={Loader2}
            className='animate-spin'
            size='sm'
          />
          <p className='font-medium'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-background text-foreground w-full'>
      <div className='min-h-full flex items-stretch'>
        <div className='shadow'>
          <SideBar />
        </div>
        <div className='flex-1 min-w-0 ml-16'>
          <FormationDataTableProvider>
            <EmployeeDataTableProvider>
              <TableContextProvider>
                <FormationCreateProvider>
                  <Outlet />
                </FormationCreateProvider>
              </TableContextProvider>
            </EmployeeDataTableProvider>
          </FormationDataTableProvider>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
export default Default;
