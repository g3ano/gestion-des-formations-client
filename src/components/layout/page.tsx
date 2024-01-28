import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Page = ({ title, actions, children }: PageProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='w-full h-screen overflow-hidden'>
      <div className='flex flex-col h-full'>
        <div className='px-6 h-20'>
          <div className='h-full w-full flex items-center gap-4'>
            <div className='flex items-center gap-4'>
              <Button
                size='icon'
                variant='ghost'
                onClick={handleBack}
              >
                <Icon render={ArrowLeft} />
              </Button>
              <p className='text-2xl font-semibold tracking-tight'>{title}</p>
            </div>
            <div className='flex-1'>{actions}</div>
          </div>
        </div>
        <div className='pt-4 h-full overflow-y-auto px-6 bg-secondary'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
