import { capitalize } from '@/lib/utils';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ label, htmlFor, children, ...props }, ref) => {
    return (
      <div className='flex-1'>
        <label
          ref={ref}
          htmlFor={htmlFor}
          className='inline-block mb-2'
          {...props}
        >
          {capitalize(label)}
        </label>
        {children}
      </div>
    );
  }
);
