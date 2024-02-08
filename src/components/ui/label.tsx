import { capitalize, cn } from '@/lib/utils';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ label, htmlFor, children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn('flex-1 flex flex-col gap-2 truncate p-0.5', className)}
        {...props}
      >
        <span className='text-muted-foreground '>{capitalize(label)}</span>
        <span>{children}</span>
      </label>
    );
  }
);
Label.displayName = 'Label';
