import Page from '@/components/layout/page';
import { Step } from '@/components/layout/step';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { CommonValuesForm } from '@/pages/formations/create/steps/common-values-form';
import { CoutValuesForm } from '@/pages/formations/create/steps/cout-values-form';
import { DirectValuesForm } from '@/pages/formations/create/steps/direct-values-form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const FormationsCreate = () => {
  const { step, backward, forward, current, total } = useStepper([
    <DirectValuesForm />,
    <CommonValuesForm />,
    <CoutValuesForm />,
  ]);

  return (
    <Page
      title='Nouveau formation'
      actions={
        <div className='flex items-center justify-end'>
          <div className='flex gap-1'>
            <div>
              {current + 1} / {total}
            </div>
            <Button
              size='icon'
              onClick={backward}
            >
              <Icon render={ChevronLeft} />
            </Button>

            <Button
              size='icon'
              onClick={forward}
            >
              <Icon render={ChevronRight} />
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between pb-8'>
        <div className='w-full h-full rounded-lg'>{step}</div>
      </div>
    </Page>
  );
};
