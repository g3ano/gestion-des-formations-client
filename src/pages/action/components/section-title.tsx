import { cn } from '@/lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionTitle = ({ className, children, ...props }: SectionTitleProps) => {
  return (
    <div className={cn('mb-4 flex items-center gap-4', className)} {...props}>
      <div className='flex-1 border-b border-secondary'></div>
      <p className='font-medium'>{children}</p>
      <div className='flex-1 border-b border-secondary'></div>
    </div>
  );
};
export default SectionTitle;
