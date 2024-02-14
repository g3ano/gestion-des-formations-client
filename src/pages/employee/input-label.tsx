import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { capitalize, cn } from '@/lib/utils';
import { EmployeeCreateContext } from '@/pages/employee/create';
import React, { useEffect } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ label, htmlFor, children, className, ...props }, ref) => {
    const {
      errorBag: { errors },
    } = EmployeeCreateContext();

    const [error, setError] = React.useState('');
    useEffect(() => {
      if (errors && htmlFor) {
        if (errors[htmlFor as keyof typeof errors]) {
          setError(errors[htmlFor as keyof typeof errors] as string);
        }
      }
    }, [errors, htmlFor, setError]);

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          'flex-1 flex flex-col gap-2 truncate p-0.5 relative',
          className
        )}
        {...props}
      >
        <span className='text-muted-foreground '>{capitalize(label)}</span>

        <Popover
          open={!!error}
          onOpenChange={() => setError('')}
        >
          <PopoverTrigger asChild>
            <span>{children}</span>
          </PopoverTrigger>
          {error && (
            <PopoverContent
              side='top'
              align='end'
              className='flex items-center justify-center px-2 bg-destructive border-red-800'
              sideOffset={10}
            >
              <span>{error}</span>
            </PopoverContent>
          )}
        </Popover>
      </label>
    );
  }
);
Label.displayName = 'Label';
