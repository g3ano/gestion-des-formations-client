import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';

export const CoutValuesForm = () => {
  return (
    <Step>
      <form>
        <div>
          <Input placeholder='cout' />
        </div>
      </form>
    </Step>
  );
};
