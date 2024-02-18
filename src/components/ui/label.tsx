import { capitalize, cn } from '@/lib/utils';
import { FormationCreateContext } from '@/pages/formation/create';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  error?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ label, htmlFor, children, className, error, ...props }, ref) => {
    const { errorBag } = FormationCreateContext();
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
        {error && (
          <span className='absolute right-0'>
            {errorBag.errors?.common?.[
              htmlFor as keyof typeof errorBag.errors.common
            ] ??
              errorBag.errors?.cout?.[
                htmlFor as keyof typeof errorBag.errors.cout
              ] ??
              errorBag.errors?.direct?.[
                htmlFor as keyof typeof errorBag.errors.direct
              ]}
          </span>
        )}
        <span className='text-muted-foreground '>{capitalize(label)}</span>
        <span>{children}</span>
      </label>
    );
  }
);
Label.displayName = 'Label';
