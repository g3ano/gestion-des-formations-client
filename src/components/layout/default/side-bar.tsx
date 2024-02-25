import Logo from '@/assets/logo';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Blocks, LayoutGrid, NotebookText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    label: 'Dashboard',
    icon: LayoutGrid,
    to: '/',
  },
  {
    label: 'Formations',
    icon: NotebookText,
    to: '/formations',
  },
  {
    label: 'Employées',
    icon: Users,
    to: '/employees',
  },
  {
    label: 'Actions',
    icon: Blocks,
    to: '/actions?view=group',
  },
];

function SideBar() {
  return (
    <div className='bg-card h-full fixed z-50 w-16 shadow-xl'>
      <div>
        <div className='rounded-sm w-full h-20 flex items-center justify-center overflow-hidden'>
          <Logo />
        </div>

        <div className='h-full py-4 flex justify-center px-2'>
          <div className='flex w-full flex-col gap-2'>
            {navigation.map((navItem) => (
              <TooltipProvider key={navItem.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='aspect-square flex w-full'>
                      <NavLink
                        to={navItem.to}
                        className={({ isActive }) =>
                          cn(
                            'rounded-sm flex items-center justify-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-accent',
                            {
                              'bg-primary text-accent-foreground hover:bg-primary/80':
                                isActive,
                            }
                          )
                        }
                      >
                        <Icon render={navItem.icon} />
                      </NavLink>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    sideOffset={20}
                  >
                    {navItem.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
