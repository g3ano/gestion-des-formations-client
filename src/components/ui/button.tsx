import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 uppercase',
          'data-[state=open]:bg-primary/90',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
          'data-[state=open]:bg-destructive/90',
        ],
        outline: [
          'border border-input bg-background text-accent-foreground shadow-sm hover:bg-light/70 hover:text-light-foreground hover:border-light-foreground focus-visible:ring-light-foreground focus-visible:bg-light/70 focus-visible:text-light-foreground',
          'data-[state=open]:bg-light/70 data-[state=open]:text-light-foreground data-[state=open]:border-light-foreground',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
          'data-[state=open]:bg-secondary',
        ],
        ghost: [
          'text-gray-700 hover:bg-light/70 hover:text-light-foreground focus:bg-light/70 focus-visible:ring-0 focus:text-light-foreground',
          'data-[state=open]:bg-light data-[state=open]:text-light-foreground',
        ],
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-10 rounded-lg px-8',
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };