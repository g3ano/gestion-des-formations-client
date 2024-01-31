import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { Formation, FormationRaw, getFormation } from '@/pages/formation';
import { FormationCreateContext } from '@/pages/formation/create';
import CoutForm from '@/pages/formation/create/steps/cout-form';
import DirectForm from '@/pages/formation/create/steps/direct-form';
import { QueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom';

const formationEditQuery = (formationId?: string) => ({
  queryKey: [
    'formations',
    {
      formationId,
    },
  ],
  queryFn: getFormation,
  notifyOnChangeProps: [],
});

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }: LoaderFunctionArgs): Promise<Formation> => {
    const query = formationEditQuery(params.formationId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function FormationEdit({}: {}) {
  const { step, backward, forward, current, total } = useStepper([
    <DirectForm />,
    <CoutForm />,
  ]);
  const { cout, common, direct, reset, setCommon, setDirect, setCout } =
    FormationCreateContext();

  const formation = useLoaderData() as FormationRaw;

  useEffect(() => {
    const keys = Object.keys(formation);
    if (keys.length) {
      keys.forEach((key) => {
        if (key in common) {
          setCommon((prev) => ({
            ...prev,
            [key]: formation[key as keyof typeof formation] ?? '',
          }));
        }

        if (key in direct) {
          setDirect((prev) => ({
            ...prev,
            [key]: formation[key as keyof typeof formation] ?? '',
          }));
        }
        if (key in cout) {
          setCout((prev) => ({
            ...prev,
            [key]: formation[key as keyof typeof formation] ?? '',
          }));
        }
      });
    }
  }, []);
  console.log(cout, direct, common);

  return (
    <Page
      title='Modifier Formation'
      actions={
        <div className='flex items-center justify-end'>
          <div className='flex items-center gap-1'>
            <Button
              onClick={backward}
              disabled={current === 0}
            >
              <Icon
                render={ChevronLeft}
                size='sm'
                edge='left'
              />
              <p>Back</p>
            </Button>

            <Button
              onClick={forward}
              disabled={current === total - 1}
            >
              <p>Next</p>
              <Icon
                render={ChevronRight}
                size='sm'
                edge='right'
              />
            </Button>
          </div>
        </div>
      }
    >
      <form>{step}</form>
    </Page>
  );
}
export default FormationEdit;
