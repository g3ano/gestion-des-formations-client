import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-sm text-sm font-medium transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground shadow hover:bg-primary/80 uppercase',
          'data-[state=open]:bg-primary/90',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 focus-visible:ring-destructive',
          'data-[state=open]:bg-destructive/90',
        ],
        outline: [
          'border ring-1 border-border ring-border text-foreground hover:bg-secondary hover:border-secondary hover:ring-secondary focus-visible:bg-primary focus-visible:border-primary focus-visible:ring-primary',
          'data-[state=open]:bg-accent/70 data-[state=open]:text-accent-foreground data-[state=open]:border-accent-foreground',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground shadow hover:bg-primary focus-visible:ring-ring',
          'data-[state=open]:bg-primary',
        ],
        ghost: [
          'text-foreground hover:bg-secondary hover:text-secondary-foreground',
          'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:shadow-xl data-[state=open]:shadow-black/10 data-[state=open]:outline data-[state=open]:outline-2 data-[state=open]:outline-primary',
        ],
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-3 py-2',
        sm: 'h-8 rounded-sm px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  edge?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, edge, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          '-translate-x-1/4': edge === 'left',
          'translate-x-1/4': edge === 'right',
        })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
