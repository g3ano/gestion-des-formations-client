import Logo from '@/assets/logo';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LayoutGrid, NotebookText, Users } from 'lucide-react';
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
];

function SideBar() {
  return (
    <div className='bg-card h-full fixed z-50 w-16 shadow-xl'>
      <div>
        <div className='rounded-lg w-full h-20 flex items-center justify-center'>
          <div className='size-12 rounded-lg flex items-center justify-center'>
            <Logo />
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
                          cn(
                            'rounded-lg p-2 flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-accent',
                            { 'bg-primary text-accent-foreground': isActive }
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
