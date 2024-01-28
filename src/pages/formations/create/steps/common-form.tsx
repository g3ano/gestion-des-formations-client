import { Step } from '@/components/layout/step';
import { FormationsCreateContext } from '@/pages/formations/create';
import { getCommonValues } from '@/pages/formations';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from '@/components/pages/auto-complete';
import { Label } from '@/components/ui/label';

export const CommonForm = () => {
  const { common, setCommon } = FormationsCreateContext();
  const {
    data: commonData,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ['formations', 'commonValues'],
    queryFn: getCommonValues,
    staleTime: 1000 * 60 * 5,
  });

  const keys = {
    intitules: 'intitule',
    organismes: 'organisme',
    code_domaines: 'code_domaine',
  } as const;
  const commonKeys =
    commonData && (Object.keys(commonData) as (keyof typeof keys)[]);
  const handleChange = (name: string, value: string) => {
    setCommon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Step>
      {isPending && <div>loading...</div>}
      {isSuccess && (
        <div className='flex items-center gap-4'>
          {commonKeys?.map((key) => {
            const data = commonData[key];

            return (
              <div
                className='flex-1'
                key={key}
              >
                <Label
                  label={keys[key].replace('_', ' ')}
                  htmlFor={keys[key]}
                >
                  <AutoComplete
                    id={keys[key]}
                    name={keys[key]}
                    placeholder={`Entrer ${keys[key].replace('_', ' ')}...`}
                    value={common[keys[key]]}
                    data={data}
                    onChange={handleChange}
                  />
                </Label>
              </div>
            );
          })}
        </div>
      )}
    </Step>
  );
};
