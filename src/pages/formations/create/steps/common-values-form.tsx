import { Step } from '@/components/layout/step';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getFormations } from '@/pages/formations';
import { FormationsCreateContext } from '@/pages/formations/create';
import { getCommonValues } from '@/pages/formations/formations.api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const CommonValuesForm = () => {
  const { commonValues, setCommonValues } = FormationsCreateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ['formations', 'commonValues'],
    queryFn: getCommonValues,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Step>
      {isPending && <div>loading...</div>}
      {isSuccess && (
        <form>
          <div>
            <Input
              name='intitule'
              value={commonValues.intitule}
              onChange={(e) => {
                if (!open) {
                  setOpen(true);
                }
                setCommonValues((prev) => ({
                  ...prev,
                  intitule: e.target.value,
                }));
              }}
            />
          </div>
          {isSuccess && !!commonValues.intitule && (
            <div role='auto complete'>
              <div>results</div>
              {JSON.stringify(data)}
            </div>
          )}
        </form>
      )}
    </Step>
  );
};
