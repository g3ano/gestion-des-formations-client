import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';
import Icon from '@/components/ui/icon';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer flex h-4 w-4 shrink-0 items-center justify-center border border-primary p-2 shadow',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground',
      className
    )}
    checked={checked}
    {...props}
  >
    {checked === 'indeterminate' ? (
      <CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
        <Icon render={Minus} size='xs' />
      </CheckboxPrimitive.Indicator>
    ) : (
      <CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
        <Icon render={Check} size='xs' />
      </CheckboxPrimitive.Indicator>
    )}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
