import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  title?: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const Page = ({ title, actions, className, children }: PageProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={cn('h-screen w-full overflow-hidden bg-background', className)}
    >
      <div className='flex h-full flex-col'>
        <div className='h-20 min-h-20 w-full px-8'>
          <div className='mx-auto flex h-full max-w-[1750px] items-center justify-center'>
            <div className='flex h-full w-full items-center gap-4'>
              <div className='flex items-center gap-4'>
                <Button size='icon' variant='ghost' onClick={handleBack}>
                  <Icon render={ArrowLeft} />
                </Button>
                <p className='text-2xl font-medium tracking-tight'>{title}</p>
              </div>
              <div className='flex-1'>{actions}</div>
            </div>
          </div>
        </div>
        <div className='h-full w-full self-center overflow-y-auto bg-inherit px-8 py-4'>
          <div className='mx-auto h-full max-w-[1750px]'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
