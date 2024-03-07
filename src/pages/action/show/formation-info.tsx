import { capitalize } from '@/lib/utils';
import SectionTitle from '@/pages/action/components/section-title';
import { Formation } from '@/pages/formation';
import { useMemo } from 'react';

function FormationInfo({ formation }: { formation: Formation }) {
  const coutKeys = useMemo(
    () =>
      Object.keys(formation.relationships.cout).filter(
        (key) => key !== 'id' && key !== 'createdAt'
      ),
    [formation.relationships.cout]
  );

  const coutValues = useMemo(
    () =>
      Object.values(formation.relationships.cout).filter(
        (_, index) => index !== 0
      ),
    [formation.relationships.cout]
  );

  return (
    <>
      <div className='bg-card flex flex-col gap-6 rounded-lg pt-6 pb-4'>
        <div className='px-6'>
          <h3 className='text-2xl font-bold'>Formation</h3>
        </div>
        <div className='h-full flex flex-col justify-between gap-6'>
          <div className='px-6'>
            <SectionTitle>Formation Prévu</SectionTitle>
            <div className='space-y-2 *:flex *:justify-between *:gap-8'>
              <div>
                <span>Structure</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.formation.structure)}
                </span>
              </div>
              <div>
                <span>Mode</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.formation.mode)}
                </span>
              </div>
              <div>
                <span>Code formation</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.codeFormation}
                </span>
              </div>
              <div>
                <span>Lieu</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.lieu}
                </span>
              </div>
              <div>
                <span>Code domaine</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.relationships.codeDomaine.codeDomaine}
                </span>
              </div>
              <div>
                <span>Domaine</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.domaine.domaine)}
                </span>
              </div>
              <div>
                <span>Organisme</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.organisme.organisme)}
                </span>
              </div>
              <div>
                <span>Type</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.type.type)}
                </span>
              </div>
              <div>
                <span>Categorie</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {capitalize(formation.relationships.categorie.categorie)}
                </span>
              </div>
            </div>
          </div>

          <div className='px-6'>
            <SectionTitle>Effectif a former</SectionTitle>
            <div className='space-y-2 *:flex *:justify-between *:items-center *:gap-8'>
              <div>
                <span>Durée</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.durree}
                </span>
              </div>
              <div>
                <span>Effectifs</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.effectif}
                </span>
              </div>
              <div>
                <span>H/J</span>
                <span className='text-muted-foreground text-right line-clamp-2'>
                  {formation.formation.HJ}
                </span>
              </div>
            </div>
          </div>

          <div className='h-full flex flex-col flex-1'>
            <SectionTitle>Cout</SectionTitle>
            <div className='divide-y divide-secondary'>
              {coutKeys.map((key, index) => (
                <div
                  key={key}
                  className='flex justify-between px-6 *:py-2'
                >
                  <p className='flex-1 flex items-center'>{capitalize(key)}</p>
                  <p className='flex-1 flex justify-center items-center'>
                    {coutValues[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FormationInfo;
