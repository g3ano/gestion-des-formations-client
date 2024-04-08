import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { HTMLAttributes, forwardRef } from 'react';

const Avatar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    icon: LucideIcon;
  }
>(({ className, icon }, ref) => {
  return (
    <div
      className={cn(
        'flex aspect-square size-11 items-center justify-center rounded-sm bg-accent shadow-inner',
        className
      )}
      ref={ref}
    >
      <Icon render={icon} />
    </div>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
