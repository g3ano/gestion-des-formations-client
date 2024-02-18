import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { useToast } from '@/lib/hooks/use-toast';
import { queryClient } from '@/lib/router';
import { cn, objCompare } from '@/lib/utils';
import ErrorPage from '@/pages/error/error';
import {
  FormationDataTableContext,
  FormationFormDataError,
  getFormation,
  updateFormation,
} from '@/pages/formation';
import { FormationCreateContext } from '@/pages/formation/create';
import CoutForm from '@/pages/formation/create/steps/cout-form';
import DirectForm from '@/pages/formation/create/steps/direct-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Save,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FormationEdit() {
  const { step, backward, forward, current, total } = useStepper([
    <DirectForm key='direct' />,
    <CoutForm key='cout' />,
  ]);
  const {
    cout,
    common,
    direct,
    setCommon,
    setDirect,
    setCout,
    reset,
    setErrorBag,
  } = FormationCreateContext();
  const { setExpanded } = FormationDataTableContext();

  const { formationId } = useParams() as { formationId: string };
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateFormation,
    onSuccess: (data) => {
      navigate('/formations');
      toast({
        description: data.message,
      });
      reset();
      setExpanded({});
      void queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
    },
    onError: (error: AxiosError<FormationFormDataError>) => {
      setErrorBag((prev) => ({
        ...prev,
        ...error?.response?.data,
      }));
    },
  });

  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ['formations', { formationId }],
    queryFn: () => getFormation(formationId),
  });
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      const { relationships, formation } = data;
      setDirect({
        categorieId: String(relationships.categorie.id),
        domaineId: String(relationships.domaine.id),
        typeId: String(relationships.type.id),
        codeFormation: formation.codeFormation,
        durree: String(formation.durree),
        effectif: String(formation.effectif),
        mode: formation.mode,
        lieu: formation.lieu,
        observation: formation.observation,
        structure: formation.structure,
      });
      setCommon({
        intitule: relationships.intitule.intitule,
        organisme: relationships.organisme.organisme,
        codeDomaine: String(relationships.codeDomaine.codeDomaine),
      });
      setCout({
        autresCharges: String(relationships.cout.autresCharges),
        pedagogiques: String(relationships.cout.pedagogiques),
        presalaire: String(relationships.cout.presalaire),
        hebergementRestauration: String(
          relationships.cout.hebergementRestauration
        ),
        dontDevise: String(relationships.cout.dontDevise),
        transport: String(relationships.cout.transport),
      });
    }

    return () => reset();
  }, [
    data,
    isSuccess,
    reset,
    setCommon,
    setCout,
    setDirect,
    resetForm,
    setResetForm,
  ]);

  const isDirty = useMemo(() => {
    if (isSuccess) {
      const { formation, relationships } = data;
      const isDirectDirty = !objCompare(direct, {
        categorieId: String(relationships.categorie.id),
        domaineId: String(relationships.domaine.id),
        typeId: String(relationships.type.id),
        codeFormation: formation.codeFormation,
        durree: String(formation.durree),
        effectif: String(formation.effectif),
        mode: formation.mode,
        lieu: formation.lieu,
        observation: formation.observation,
        structure: formation.structure,
      });
      const isCoutDirty = !objCompare(cout, {
        autresCharges: String(relationships.cout.autresCharges),
        pedagogiques: String(relationships.cout.pedagogiques),
        presalaire: String(relationships.cout.presalaire),
        hebergementRestauration: String(
          relationships.cout.hebergementRestauration
        ),
        dontDevise: String(relationships.cout.dontDevise),
        transport: String(relationships.cout.transport),
      });
      const isCommonDirty = !objCompare(common, {
        intitule: relationships.intitule.intitule,
        organisme: relationships.organisme.organisme,
        codeDomaine: String(relationships.codeDomaine.codeDomaine),
      });
      return isDirectDirty || isCoutDirty || isCommonDirty;
    }
    return false;
  }, [isSuccess, data, direct, cout, common]);

  useEffect(() => () => setErrorBag({}), [setErrorBag]);

  const handleEdit = () => {
    mutation.mutate({
      formationId,
      body: {
        direct,
        common,
        cout,
      },
    });
  };

  if (isError) {
    return <ErrorPage _error={error} />;
  }

  return (
    <Page
      title='Modifier Formation'
      actions={
        <div className='flex items-center justify-end'>
          <div className='space-x-2'>
            <Button variant='outline'>
              <Icon
                render={CheckCheck}
                size='sm'
                edge='left'
              />
              <span>Preview</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => setResetForm((prev) => !prev)}
              disabled={!isDirty}
            >
              <Icon
                render={RotateCcw}
                size='sm'
                edge='left'
              />
              <span>Resté</span>
            </Button>
            <Button
              onClick={handleEdit}
              disabled={!isDirty || mutation.isPending}
              className='-ml-2'
            >
              <Icon
                render={mutation.isPending ? Loader2 : Save}
                size='sm'
                className={cn('mr-1', {
                  'animate-spin': mutation.isPending,
                })}
              />
              <span>Modifier</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          {isPending && (
            <div className='flex items-center gap-2'>
              <Icon
                render={Loader2}
                size='sm'
                className='animate-spin'
              />
              <div>Loading...</div>
            </div>
          )}
          {isSuccess && <form>{step}</form>}
          <div className='absolute bottom-0 inset-x-0 pb-2'>
            <div className='flex items-end justify-between'>
              <div>
                {current + 1} / {total}
              </div>

              <div className='flex items-center gap-2'>
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
          </div>
        </div>
      </div>
    </Page>
  );
}
export default FormationEdit;
