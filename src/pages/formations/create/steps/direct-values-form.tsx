import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FormationsCreateContext } from '@/pages/formations/create';

export const DirectValuesForm = () => {
  const { directValues, setDirectValues } = FormationsCreateContext();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDirectValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(directValues);

  return (
    <Step>
      <form>
        <div className='space-y-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
              <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
              <span className='font-semibold text-lg'>Formation</span>
              <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='structure'>Structure</label>
                  <Input
                    name='structure'
                    value={directValues.structure}
                    onChange={handleChange}
                    placeholder='Enter structure...'
                    className=''
                  />
                </div>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='code_formation'>Code formation</label>
                  <Input
                    name='code_formation'
                    value={directValues.code_formation}
                    onChange={handleChange}
                    placeholder='Enter code formation...'
                  />
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex-1 flex flex-col gap-2'>
                  <label htmlFor='mode'>Mode</label>
                  <Select
                    name='mode'
                    value={directValues.mode}
                    onValueChange={(value) =>
                      setDirectValues((prev) => ({
                        ...prev,
                        mode: value,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Présentiel' />
                    </SelectTrigger>
                    <SelectContent align='end'>
                      <SelectItem value='présentiel'>Présentiel</SelectItem>
                      <SelectItem value='distanciel'>Distanciel</SelectItem>
                      <SelectItem value='Blended'>Blended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                  <label htmlFor='domaine'>Domaine</label>
                  <Select
                    name='domaine'
                    value={directValues.domaine}
                    onValueChange={(value) =>
                      setDirectValues((prev) => ({
                        ...prev,
                        domaine: value,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='FCM' />
                    </SelectTrigger>
                    <SelectContent align='end'>
                      <SelectItem value='FCM'>FCM</SelectItem>
                      <SelectItem value='FST'>FST</SelectItem>
                      <SelectItem value='FSP'>FSP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                  <label htmlFor='categorie'>Categorie</label>
                  <Select
                    name='categorie'
                    value={directValues.categorie}
                    onValueChange={(value) =>
                      setDirectValues((prev) => ({
                        ...prev,
                        categorie: value,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Actions d'adaptation au poste de travail" />
                    </SelectTrigger>
                    <SelectContent align='end'>
                      <SelectItem value='1'>
                        Actions d'adaptation au poste de travail
                      </SelectItem>
                      <SelectItem value='2'>
                        Actions liées à l'évolution des métiers & technologies
                      </SelectItem>
                      <SelectItem value='3'>
                        Actions liées au développement des compétences
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='lie'>Lieu</label>
                  <Input
                    name='lieu'
                    value={directValues.lieu}
                    onChange={handleChange}
                    placeholder='Enter lieu...'
                  />
                </div>
                <div className='flex-1 flex flex-col gap-2'>
                  <label htmlFor='type'>Type</label>
                  <Select
                    name='type'
                    value={directValues.type}
                    onValueChange={(value) =>
                      setDirectValues((prev) => ({
                        ...prev,
                        type: value,
                      }))
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Formation/Recrutement' />
                    </SelectTrigger>
                    <SelectContent align='end'>
                      <SelectItem value='1'>Formation/Recrutement</SelectItem>
                      <SelectItem value='2'>Perfectionnement</SelectItem>
                      <SelectItem value='3'>
                        Formation de reconversion
                      </SelectItem>
                      <SelectItem value='4'>Stages Fournisseurs</SelectItem>
                      <SelectItem value='5'>Formation Induction</SelectItem>
                      <SelectItem value='6'>Formation Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='observation'>Observation</label>
                  <textarea
                    rows={7}
                    name='observation'
                    value={directValues.observation}
                    onChange={handleChange}
                    placeholder='Entrer Observation...'
                    className={cn(
                      'resize-none flex w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors',
                      'placeholder:text-muted-foreground',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-4'>
              <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
              <span className='font-semibold text-lg'>Effectif à former</span>
              <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex-1 space-y-2'>
                <label htmlFor='effectif'>Effectif</label>
                <Input
                  type='number'
                  name='effectif'
                  value={directValues.effectif}
                  onChange={handleChange}
                  placeholder='Enter nombre des effectifs...'
                />
              </div>
              <div className='flex-1 space-y-2'>
                <label htmlFor='durree'>Durree</label>
                <Input
                  type='number'
                  name='durree'
                  value={directValues.durree}
                  onChange={handleChange}
                  placeholder='Enter durree...'
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className='flex w-full mt-8'>
        <div className='flex justify-center flex-1'>
          <p>choose some values for the formations and effectifs</p>
        </div>
      </div>
    </Step>
  );
};
