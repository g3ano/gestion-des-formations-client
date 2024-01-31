import { Step } from '@/components/layout/step';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormationCreateContext } from '@/pages/formation/create';

function CoutForm() {
  const { cout, setCout } = FormationCreateContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCout((prev) => ({
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
            <span className='font-medium text-lg'>Coût</span>
            <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Label
                htmlFor='pedagogiques'
                label='Frais pédagogiques'
              >
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
                htmlFor='hebergement_restauration'
                label="Frais d'hébergement et restauration"
              >
                <label htmlFor='hebergement_restauration'></label>
                <Input
                  name='hebergement_restauration'
                  id='hebergement_restauration'
                  type='number'
                  value={cout.hebergement_restauration}
                  onChange={handleChange}
                  placeholder="Entrer frais d'Hébergement & Restauration..."
                />
              </Label>
              <Label
                htmlFor='transport'
                label='Frais de transport'
              >
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
              <Label
                htmlFor='presalaire'
                label='Présalaire'
              >
                <Input
                  name='presalaire'
                  id='presalaire'
                  type='number'
                  value={cout.presalaire}
                  onChange={handleChange}
                  placeholder='Entrer presalaire..'
                />
              </Label>
              <Label
                htmlFor='autres_charges'
                label='Autres charges'
              >
                <Input
                  name='autres_charges'
                  id='autres_charges'
                  type='number'
                  value={cout.autres_charges}
                  onChange={handleChange}
                  placeholder='Entrer autres charges...'
                />
              </Label>
              <Label
                htmlFor='dont_device'
                label='Dont device'
              >
                <Input
                  name='dont_devise'
                  id='dont_devise'
                  type='number'
                  value={cout.dont_devise}
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
