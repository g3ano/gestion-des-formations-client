import Logo from '@/assets/logo';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Blocks, NotebookText, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    label: 'Actions',
    icon: Blocks,
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
];

function SideBar() {
  return (
    <div className='fixed z-50 h-full w-16 bg-card shadow-xl'>
      <div>
        <div className='flex h-20 w-full items-center justify-center overflow-hidden rounded-sm'>
          <Logo />
        </div>

        <div className='flex h-full justify-center px-2 py-4'>
          <div className='flex w-full flex-col gap-2'>
            {navigation.map((navItem) => (
              <TooltipProvider key={navItem.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='flex aspect-square w-full'>
                      <NavLink
                        to={navItem.to}
                        className={({ isActive }) =>
                          cn(
                            'flex w-full items-center justify-center rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                            {
                              'bg-primary text-accent-foreground hover:bg-primary/80':
                                isActive,
                            }
                          )
                        }
                      >
                        <Icon render={navItem.icon} size='base' />
                      </NavLink>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side='right' sideOffset={20}>
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
