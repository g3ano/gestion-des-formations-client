import { Step } from '@/components/layout/step';
import { FormationsCreateContext } from '@/pages/formations/create';
import { getCommonValues } from '@/pages/formations';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from '@/components/pages/auto-complete';

export const CommonValuesForm = () => {
  const { commonValues, setCommonValues } = FormationsCreateContext();
  const {
    data: commonValuesData,
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
  const commonValuesKeys =
    commonValuesData &&
    (Object.keys(commonValuesData) as (keyof typeof keys)[]);
  const handleChange = (name: string, value: string) => {
    setCommonValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Step>
      {isPending && <div>loading...</div>}
      {isSuccess && (
        <form>
          <div className='flex items-center gap-4'>
            {commonValuesKeys?.map((key) => {
              const data = commonValuesData[key];

              return (
                <div
                  className='flex-1'
                  key={key}
                >
                  <div className='flex-1 space-y-2'>
                    <label
                      htmlFor='effectif'
                      className='capitalize'
                    >
                      {keys[key]}
                    </label>
                    <AutoComplete
                      name={keys[key]}
                      placeholder={`Entrer ${keys[key]}...`}
                      value={commonValues[keys[key]]}
                      data={data}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      )}
    </Step>
  );
};
