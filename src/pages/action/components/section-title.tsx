import { cn } from '@/lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionTitle = ({ className, children, ...props }: SectionTitleProps) => {
  return (
    <div
      className={cn('flex items-center gap-4 mb-4', className)}
      {...props}
    >
      <div className='border-b border-secondary flex-1'></div>
      <p className='font-medium'>{children}</p>
      <div className='border-b border-secondary flex-1'></div>
    </div>
  );
};
export default SectionTitle;
