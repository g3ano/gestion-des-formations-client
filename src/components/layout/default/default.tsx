import { SideBar } from '@/components/layout/default';
import Icon from '@/components/ui/icon';
import { Toaster } from '@/components/ui/toaster';
import { TableContextProvider } from '@/lib/contexts/table-context';
import { ActionCreateProvider } from '@/pages/action';
import { EmployeeDataTableProvider } from '@/pages/employee';
import { EmployeeCreateProvider } from '@/pages/employee/create';
import { FormationDataTableProvider } from '@/pages/formation';
import { FormationCreateProvider } from '@/pages/formation/create';
import { Loader2 } from 'lucide-react';
import { Outlet, useNavigation } from 'react-router-dom';

function Default() {
  const { state } = useNavigation();

  if (state === 'loading') {
    return (
      <div className='fixed left-1/2 top-0 mt-8 -translate-x-1/2'>
        <div className='flex items-center gap-2'>
          <Icon render={Loader2} className='animate-spin' size='sm' />
          <p className='font-medium'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full bg-background text-foreground'>
      <div className='flex min-h-full items-stretch'>
        <div className='shadow'>
          <SideBar />
        </div>
        <div className='ml-16 min-w-0 flex-1'>
          <FormationDataTableProvider>
            <EmployeeDataTableProvider>
              <TableContextProvider>
                <EmployeeCreateProvider>
                  <FormationCreateProvider>
                    <ActionCreateProvider>
                      <Outlet />
                    </ActionCreateProvider>
                  </FormationCreateProvider>
                </EmployeeCreateProvider>
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
