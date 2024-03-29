import * as React from 'react';
import * as DayPickerPrimitive from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
export type CalendarProps = React.ComponentProps<
  typeof DayPickerPrimitive.DayPicker
>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode,
  ...props
}: CalendarProps) {
  return (
    <DayPickerPrimitive.DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex flex-col pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-center mb-1',
        nav: 'w-full flex items-center justify-between gap-4 absolute top-0',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0'
        ),
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-sm w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-sm',
          mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-sm [&:has(>.day-range-start)]:rounded-l-sm first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm'
            : '[&:has([aria-selected])]:rounded-sm'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        dropdown: '',
        caption_dropdowns: 'w-full flex flex-col gap-2',
        dropdown_year:
          'bg-secondary border border-border rounded-sm px-2 py-1 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        dropdown_month:
          'bg-secondary border border-border rounded-sm px-2 py-1 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className='h-4 w-4' {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className='h-4 w-4' {...props} />
        ),
        Dropdown: ({
          value,
          onChange,
          children,
          name,
          className,
          ...props
        }) => {
          return (
            <select
              name={name}
              value={value}
              onChange={onChange}
              className={className}
              {...props}
            >
              {children}
            </select>
          );
        },
        IconDropdown: (props) => (
          <ChevronsUpDown className='h-4 w-4 opacity-50' {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
