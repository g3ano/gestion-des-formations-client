import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FormationsCreateContext } from '@/pages/formations/create';
import { CommonForm } from '@/pages/formations/create/steps/common-form';

export const DirectForm = () => {
  const { direct, setDirect } = FormationsCreateContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDirect((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Step>
      <div className='space-y-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center gap-4'>
            <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
            <span className='font-semibold text-lg'>Formation</span>
            <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Label
                htmlFor='structure'
                label='Structure'
              >
                <Input
                  name='structure'
                  id='structure'
                  value={direct.structure}
                  onChange={handleChange}
                  placeholder='Entrer structure...'
                  className=''
                />
              </Label>
              <Label
                htmlFor='code_formation'
                label='code formation'
              >
                <Select
                  name='code_formation'
                  value={direct.code_formation}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      code_formation: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='code_formation'
                  >
                    <SelectValue placeholder='CDI' />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='cdi'>CDI</SelectItem>
                    <SelectItem value='cda'>CDA</SelectItem>
                    <SelectItem value='cde'>CDE</SelectItem>
                    <SelectItem value='ldi'>LDI</SelectItem>
                    <SelectItem value='lda'>LDA</SelectItem>
                    <SelectItem value='lde'>LDE</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <div className='flex items-center gap-4'>
              <Label
                label='mode'
                htmlFor='mode'
              >
                <Select
                  name='mode'
                  value={direct.mode}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      mode: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='mode'
                  >
                    <SelectValue
                      placeholder='Présentiel'
                      defaultValue='Présentiel'
                    />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='présentiel'>Présentiel</SelectItem>
                    <SelectItem value='distanciel'>Distanciel</SelectItem>
                    <SelectItem value='blended'>Blended</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
              <Label
                label='domaine'
                htmlFor='domaine_id'
              >
                <Select
                  name='domaine_id'
                  value={direct.domaine_id}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      domaine_id: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='domaine_id'
                  >
                    <SelectValue placeholder='FCM' />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='1'>FCM</SelectItem>
                    <SelectItem value='2'>FST</SelectItem>
                    <SelectItem value='3'>FSP</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
              <Label
                label='categorie'
                htmlFor='categorie_id'
              >
                <Select
                  name='categorie_id'
                  value={direct.categorie_id}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      categorie_id: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='categorie_id'
                  >
                    <SelectValue
                      placeholder="Actions d'adaptation au poste de travail"
                      defaultValue="actions d'adaptation au poste de travail"
                    />
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
              </Label>
            </div>
            <div className='flex items-center gap-4'>
              <Label
                label='lieu'
                htmlFor='lieu'
              >
                <Input
                  name='lieu'
                  id='lieu'
                  value={direct.lieu}
                  onChange={handleChange}
                  placeholder='Entrer lieu...'
                />
              </Label>
              <Label
                label='type'
                htmlFor='type_id'
              >
                <Select
                  name='type_id'
                  value={direct.type_id}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      type_id: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='type_id'
                  >
                    <SelectValue
                      placeholder='Formation recrutement'
                      defaultValue='1'
                    />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='1'>Formation Recrutement</SelectItem>
                    <SelectItem value='2'>Perfectionnement</SelectItem>
                    <SelectItem value='3'>Formation de reconversion</SelectItem>
                    <SelectItem value='4'>Stages Fournisseurs</SelectItem>
                    <SelectItem value='5'>Formation Induction</SelectItem>
                    <SelectItem value='6'>Formation Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
            </div>
            <div>
              <CommonForm />
            </div>
            <div className='flex items-center gap-4'>
              <Label
                label='observation'
                htmlFor='observation'
              >
                <textarea
                  rows={7}
                  name='observation'
                  id='observation'
                  value={direct.observation}
                  onChange={handleChange}
                  placeholder='Entrer Observation...'
                  className={cn(
                    'resize-none flex w-full rounded-lg border border-input bg-background px-3 py-3 text-sm shadow-sm transition-colors',
                    'placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                />
              </Label>
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
                id='effectif'
                value={direct.effectif}
                onChange={handleChange}
                placeholder='Entrer nombre des effectifs...'
              />
            </div>
            <div className='flex-1 space-y-2'>
              <label htmlFor='durree'>Durree</label>
              <Input
                type='number'
                name='durree'
                id='durree'
                value={direct.durree}
                onChange={handleChange}
                placeholder='Entrer durree...'
              />
            </div>
          </div>
        </div>
      </div>
    </Step>
  );
};
