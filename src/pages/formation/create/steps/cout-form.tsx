import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';
import { FormationCreateContext } from '@/pages/formation/create';
import { Label } from '@/pages/formation/input-label';

function CoutForm() {
  const { cout, setCout, direct, setDirect } = FormationCreateContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in cout) {
      setCout((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name in direct) {
      setDirect((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Step>
      <div className='space-y-20'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-center gap-8'>
            <div className='mt-1 h-px flex-1 bg-accent-foreground/20'></div>
            <span className='text-xl font-medium'>Effectif à former</span>
            <div className='mt-1 h-px flex-1 bg-accent-foreground/20'></div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex-1 space-y-2'>
              <Label label='effectif' htmlFor='effectif'>
                <Input
                  type='number'
                  name='effectif'
                  id='effectif'
                  value={direct.effectif}
                  onChange={handleChange}
                  placeholder='Entrer nombre des effectifs...'
                />
              </Label>
            </div>
            <div className='flex-1 space-y-2'>
              <Label label='durree' htmlFor='durree'>
                <Input
                  type='number'
                  name='durree'
                  id='durree'
                  value={direct.durree}
                  onChange={handleChange}
                  placeholder='Entrer durree...'
                />
              </Label>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex items-center justify-center gap-4'>
            <div className='mt-1 h-px flex-1 bg-accent-foreground/20'></div>
            <span className='text-xl font-medium'>Coût</span>
            <div className='mt-1 h-px flex-1 bg-accent-foreground/20'></div>
          </div>
          <div className='space-y-8'>
            <div className='flex items-center gap-4'>
              <Label htmlFor='pedagogiques' label='Frais pédagogiques'>
                <Input
                  name='pedagogiques'
                  id='pedagogiques'
                  type='number'
                  value={cout.pedagogiques}
                  onChange={handleChange}
                  placeholder='Entrer pedagogiques...'
                />
              </Label>
              <Label
                htmlFor='hebergementRestauration'
                label="Frais d'hébergement et restauration"
              >
                <label htmlFor='hebergementRestauration'></label>
                <Input
                  name='hebergementRestauration'
                  id='hebergementRestauration'
                  type='number'
                  value={cout.hebergementRestauration}
                  onChange={handleChange}
                  placeholder="Entrer frais d'Hébergement & Restauration..."
                />
              </Label>
              <Label htmlFor='transport' label='Frais de transport'>
                <Input
                  name='transport'
                  id='transport'
                  type='number'
                  value={cout.transport}
                  onChange={handleChange}
                  placeholder='Entrer frais de transport...'
                />
              </Label>
            </div>

            <div className='flex items-center gap-4'>
              <Label htmlFor='presalaire' label='Présalaire'>
                <Input
                  name='presalaire'
                  id='presalaire'
                  type='number'
                  value={cout.presalaire}
                  onChange={handleChange}
                  placeholder='Entrer presalaire..'
                />
              </Label>
              <Label htmlFor='autresCharges' label='Autres charges'>
                <Input
                  name='autresCharges'
                  id='autresCharges'
                  type='number'
                  value={cout.autresCharges}
                  onChange={handleChange}
                  placeholder='Entrer autres charges...'
                />
              </Label>
              <Label htmlFor='dontDevise' label='Dont device'>
                <Input
                  name='dontDevise'
                  id='dontDevise'
                  type='number'
                  value={cout.dontDevise}
                  onChange={handleChange}
                  placeholder='Entrer dont device...'
                />
              </Label>
            </div>
          </div>
        </div>
      </div>
    </Step>
  );
}
export default CoutForm;
