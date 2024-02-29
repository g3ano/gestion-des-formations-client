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
      className={cn('w-full h-screen overflow-hidden bg-background', className)}
    >
      <div className='flex flex-col h-full'>
        <div className='w-full min-h-20 h-20 px-8'>
          <div className='max-w-[1750px] h-full flex items-center justify-center mx-auto'>
            <div className='h-full w-full flex items-center gap-4'>
              <div className='flex items-center gap-4'>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={handleBack}
                >
                  <Icon render={ArrowLeft} />
                </Button>
                <p className='text-2xl font-medium tracking-tight'>{title}</p>
              </div>
              <div className='flex-1'>{actions}</div>
            </div>
          </div>
        </div>
        <div className='w-full self-center py-4 h-full overflow-y-auto px-8 bg-inherit'>
          <div className='max-w-[1750px] mx-auto h-full'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
