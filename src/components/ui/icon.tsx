import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { LucideIcon, LucideProps } from 'lucide-react';
import { SVGProps } from 'react';

const iconVariants = cva('', {
  variants: {
    size: {
      base: 'size-6',
      sm: 'size-5',
      xs: 'size-[17px]',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

interface IconProps
  extends Omit<LucideProps, 'size'>,
    Omit<SVGProps<SVGSVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  render: LucideIcon;
  edge?: 'left' | 'right';
}

const Icon = ({ className, size, edge, ...props }: IconProps) => {
  return (
    <props.render
      className={cn(iconVariants({ size, className }), {
        '-translate-x-1/2': edge === 'left',
        'translate-x-1/2': edge === 'right',
      })}
      {...props}
    />
  );
};

export default Icon;
