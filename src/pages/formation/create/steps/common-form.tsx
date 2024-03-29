import { Step } from '@/components/layout/step';
import { AutoComplete } from '@/components/ui/auto-complete';
import { getCommonValues } from '@/pages/formation';
import { FormationCreateContext } from '@/pages/formation/create';
import { Label } from '@/pages/formation/input-label';
import { useQuery } from '@tanstack/react-query';

function CommonForm() {
  const { common, setCommon } = FormationCreateContext();
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
    codeDomaines: 'codeDomaine',
  } as const;
  const commonDataKeys =
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
          {commonDataKeys?.map((key) => {
            const data = commonData[key];

            return (
              <div className='flex-1' key={key}>
                <Label label={keys[key]} htmlFor={keys[key]}>
                  <AutoComplete
                    id={keys[key]}
                    name={keys[key]}
                    placeholder={`Entrer ${keys[key]}...`}
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
}
export default CommonForm;
