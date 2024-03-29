import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipProvider = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Provider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ children }, _ref) => (
  <TooltipPrimitive.Provider delayDuration={100}>
    {children}
  </TooltipPrimitive.Provider>
));
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 mx-1 overflow-hidden rounded-sm bg-secondary px-3 py-1.5 text-xs text-primary-foreground drop-shadow-xl animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
