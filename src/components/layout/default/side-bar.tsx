import Logo from '@/assets/logo';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LayoutDashboard, NotebookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    label: 'dashboard',
    icon: LayoutDashboard,
    to: '/',
  },
  {
    label: 'formations',
    icon: NotebookText,
    to: '/formations',
  },
];

const SideBar = () => {
  return (
    <div className='bg-background h-full fixed z-50 w-16 shadow-xl'>
      <div>
        <div className='rounded-lg w-full h-20 flex items-center justify-center'>
          <div className='h-12 rounded-lg flex items-center justify-center'>
            <Logo className='size-8 fill-primary shadow' />
          </div>
        </div>

        <div className='h-full py-4 flex justify-center'>
          <div className='flex flex-col gap-3 px-2'>
            {navigation.map((navItem) => (
              <TooltipProvider key={navItem.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='size-10 flex'>
                      <NavLink
                        to={navItem.to}
                        className={({ isActive }) =>
                          cn('rounded-lg p-2', {
                            'bg-light': isActive,
                          })
                        }
                      >
                        {({ isActive }) => (
                          <Icon
                            render={navItem.icon}
                            className={cn({
                              'text-light-foreground': isActive,
                            })}
                          />
                        )}
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
};

export default SideBar;