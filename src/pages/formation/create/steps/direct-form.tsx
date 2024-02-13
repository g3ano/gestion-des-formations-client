import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CommonForm, FormationCreateContext } from '@/pages/formation/create';
import { Label } from '@/pages/formation/input-label';

function DirectForm() {
  const { direct, setDirect } = FormationCreateContext();

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
      <div className='space-y-20'>
        <div className='w-full flex flex-col gap-8'>
          <div className='flex items-center justify-center gap-4'>
            <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
            <span className='font-medium text-xl'>Formation</span>
            <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
          </div>
          <div className='space-y-8'>
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
                  maxLength={50}
                />
              </Label>
              <Label
                htmlFor='codeFormation'
                label='code formation'
              >
                <Select
                  name='codeFormation'
                  value={direct.codeFormation}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      codeFormation: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='codeFormation'
                  >
                    <SelectValue placeholder='CDI' />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='CDI'>CDI</SelectItem>
                    <SelectItem value='CDA'>CDA</SelectItem>
                    <SelectItem value='CDE'>CDE</SelectItem>
                    <SelectItem value='LDI'>LDI</SelectItem>
                    <SelectItem value='LDA'>LDA</SelectItem>
                    <SelectItem value='LDE'>LDE</SelectItem>
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
                    <SelectItem value='Présentiel'>Présentiel</SelectItem>
                    <SelectItem value='Distanciel'>Distanciel</SelectItem>
                    <SelectItem value='Blended'>Blended</SelectItem>
                  </SelectContent>
                </Select>
              </Label>
              <Label
                label='domaine'
                htmlFor='domaineId'
              >
                <Select
                  name='domaineId'
                  value={direct.domaineId}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      domaineId: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='domaineId'
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
                htmlFor='categorieId'
              >
                <Select
                  name='categorieId'
                  value={direct.categorieId}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      categorieId: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='categorieId'
                  >
                    <SelectValue
                      placeholder="Actions d'adaptation au poste de travail"
                      defaultValue="actions d'adaptation au poste de travail"
                    />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    <SelectItem value='1'>
                      Actions d&apojadaptation au poste de travail
                    </SelectItem>
                    <SelectItem value='2'>
                      Actions liées à l&aposévolution des métiers & technologies
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
                  maxLength={50}
                />
              </Label>
              <Label
                label='type'
                htmlFor='typeId'
              >
                <Select
                  name='typeId'
                  value={direct.typeId}
                  onValueChange={(value) =>
                    setDirect((prev) => ({
                      ...prev,
                      typeId: value,
                    }))
                  }
                >
                  <SelectTrigger
                    className='w-full'
                    id='typeId'
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
                    'resize-none flex w-full rounded-lg shadow-black/10 bg-card px-3 py-3 text-sm shadow-sm transition-colors',
                    'placeholder:text-muted-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  maxLength={255}
                />
              </Label>
            </div>
          </div>
          <div className='space-y-8'>
            <CommonForm />
          </div>
        </div>
      </div>
    </Step>
  );
}
export default DirectForm;
