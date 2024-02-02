import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useStepper from '@/lib/hooks/use-stepper';
import { queryClient } from '@/lib/router';
import { editFormation, getFormation } from '@/pages/formation';
import { FormationCreateContext } from '@/pages/formation/create';
import CoutForm from '@/pages/formation/create/steps/cout-form';
import DirectForm from '@/pages/formation/create/steps/direct-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckCheck, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FormationEdit({}: {}) {
  const { step, backward, forward, current, total } = useStepper([
    <DirectForm />,
    <CoutForm />,
  ]);
  const { cout, common, direct, setCommon, setDirect, setCout, reset } =
    FormationCreateContext();

  const params = useParams();
  const formationId = params.formationId;
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: [
      'formations',
      {
        formationId,
      },
    ],
    queryFn: getFormation,
  });
  const mutation = useMutation({
    mutationKey: ['formations', 'edit', { formationId }],
    mutationFn: editFormation,
    onSuccess: () => {
      reset();
      navigate('/formations');
      queryClient.invalidateQueries({
        queryKey: ['formations'],
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const { relationships, formation } = data;
      setDirect({
        categorie_id: String(relationships.categorie.id),
        domaine_id: String(relationships.domaine.id),
        type_id: String(relationships.type.id),
        code_formation: formation.code_formation,
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
        code_domaine: String(relationships.code_domaine.code_domaine),
      });
      setCout({
        autres_charges: relationships.couts.autres_charges,
        pedagogiques: relationships.couts.pedagogiques,
        presalaire: relationships.couts.presalaire,
        hebergement_restauration: relationships.couts.hebergement_restauration,
        dont_devise: relationships.couts.dont_devise,
        transport: relationships.couts.transport,
      });
    }
  }, [isSuccess]);

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
      <div className='h-full flex flex-col justify-between relative'>
        <div className='w-full h-full rounded-lg'>
          <form>{step}</form>
          <div className='absolute bottom-0 inset-x-0 pb-2'>
            <div className='flex items-end justify-between'>
              <div>
                {current + 1} / {total}
              </div>

              <div className='space-x-2'>
                <Button>
                  <Icon
                    render={CheckCheck}
                    size='sm'
                    edge='left'
                  />
                  <span>Preview</span>
                </Button>
                <Button
                  className='px-5'
                  onClick={handleEdit}
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
          </div>
        </div>
      </div>
    </Page>
  );
}
export default FormationEdit;
