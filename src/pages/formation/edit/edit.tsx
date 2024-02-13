import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { useToast } from '@/lib/hooks/use-toast';
import { queryClient } from '@/lib/router';
import { objCompare } from '@/lib/utils';
import {
  FormationFormDataError,
  editFormation,
  getFormation,
} from '@/pages/formation';
import { FormationCreateContext } from '@/pages/formation/create';
import CoutForm from '@/pages/formation/create/steps/cout-form';
import DirectForm from '@/pages/formation/create/steps/direct-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckCheck, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useEffect, useMemo } from 'react';
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

  const params = useParams();
  const formationId = params.formationId;
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: ['formations', 'edit', { formationId }],
    mutationFn: editFormation,
    onSuccess: (data) => {
      reset();
      navigate('/formations');
      void queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
      toast({
        description: data.message,
      });
    },
    onError: (error) => {
      setErrorBag((prev) => ({
        ...prev,
        ...(error?.response?.data as FormationFormDataError),
      }));
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ['formations', { formationId }],
    queryFn: getFormation,
  });

  useEffect(() => {
    if (isSuccess) {
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
  }, [data, isSuccess, reset, setCommon, setCout, setDirect]);

  const canBeUpdated = useMemo(() => {
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
              onClick={handleEdit}
              disabled={!canBeUpdated}
            >
              <Icon
                render={Save}
                size='sm'
                edge='left'
              />
              <span>Modifier</span>
            </Button>
          </div>
        </div>
      }
    >
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          <form>{step}</form>
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
