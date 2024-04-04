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
      <div className='flex flex-col gap-6 rounded-lg bg-card pb-4 pt-6'>
        <div className='px-6'>
          <h3 className='text-2xl font-bold'>Formation</h3>
        </div>
        <div className='flex h-full flex-col justify-between gap-6'>
          <div className='px-6'>
            <SectionTitle>Formation Prévu</SectionTitle>
            <div className='space-y-2 *:flex *:justify-between *:gap-8'>
              <div>
                <span>Structure</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.attributes.structure)}
                </span>
              </div>
              <div>
                <span>Mode</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.attributes.mode)}
                </span>
              </div>
              <div>
                <span>Code formation</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.attributes.codeFormation}
                </span>
              </div>
              <div>
                <span>Lieu</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.attributes.lieu}
                </span>
              </div>
              <div>
                <span>Code domaine</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.relationships.codeDomaine.codeDomaine}
                </span>
              </div>
              <div>
                <span>Domaine</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.relationships.domaine.domaine)}
                </span>
              </div>
              <div>
                <span>Organisme</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.relationships.organisme.organisme)}
                </span>
              </div>
              <div>
                <span>Type</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.relationships.type.type)}
                </span>
              </div>
              <div>
                <span>Categorie</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {capitalize(formation.relationships.categorie.categorie)}
                </span>
              </div>
            </div>
          </div>

          <div className='px-6'>
            <SectionTitle>Effectif a former</SectionTitle>
            <div className='space-y-2 *:flex *:items-center *:justify-between *:gap-8'>
              <div>
                <span>Durée</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.attributes.durree}
                </span>
              </div>
              <div>
                <span>Effectifs</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.attributes.effectif}
                </span>
              </div>
              <div>
                <span>H/J</span>
                <span className='line-clamp-2 text-right text-muted-foreground'>
                  {formation.attributes.HJ}
                </span>
              </div>
            </div>
          </div>

          <div className='flex h-full flex-1 flex-col'>
            <SectionTitle>Cout</SectionTitle>
            <div className='divide-y divide-secondary'>
              {coutKeys.map((key, index) => (
                <div key={key} className='flex justify-between px-6 *:py-2'>
                  <p className='flex flex-1 items-center'>{capitalize(key)}</p>
                  <p className='flex flex-1 items-center justify-center'>
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
