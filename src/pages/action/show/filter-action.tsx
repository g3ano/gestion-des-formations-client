import { Button } from '@/components/ui/button';
import { capitalize, cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

const types = [
  'formation corporate',
  'formation induction',
  'formation de reconversion',
  'perfectionnement',
  'stages fournisseurs',
  'formation/recrutement',
];
const domaines = ['FST', 'FCM', 'FSP'];
const codeFormations = ['CDA', 'CDI', 'CDE', 'LDA', 'LDI', 'LDE'];
const modes = ['Blended', 'Distanciel', 'Présentiel'];

function FilterActions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleButtonClick = (key: string, value: string) => {
    setSearchParams((prev) => {
      const _searchParams = new URLSearchParams(prev);
      _searchParams.set(key, encodeURIComponent(value));
      return _searchParams;
    });
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <p className='font-bold uppercase'>type</p>
        <div className='flex flex-wrap gap-2'>
          {types.map((type) => (
            <Button
              key={type}
              variant='outline'
              className={cn('justify-start', {
                'bg-accent text-accent-foreground border-accent':
                  decodeURIComponent(searchParams.get('type')!) === type,
              })}
              onClick={() => handleButtonClick('type', type)}
            >
              {capitalize(type)}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium uppercase'>domaine</p>
        <div className='flex flex-wrap gap-2'>
          {domaines.map((domaine) => (
            <Button
              key={domaine}
              variant='outline'
              className={cn('justify-start', {
                'bg-accent text-accent-foreground border-accent':
                  decodeURIComponent(searchParams.get('domaine')!) === domaine,
              })}
              onClick={() => handleButtonClick('domaine', domaine)}
            >
              {domaine}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium uppercase'>code formation</p>
        <div className='flex flex-wrap gap-2'>
          {codeFormations.map((codeFormation) => (
            <Button
              key={codeFormation}
              variant='outline'
              className={cn('justify-start', {
                'bg-accent text-accent-foreground border-accent':
                  decodeURIComponent(searchParams.get('codeFormation')!) ===
                  codeFormation,
              })}
              onClick={() => handleButtonClick('codeFormation', codeFormation)}
            >
              {codeFormation}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium uppercase'>mode</p>
        <div className='flex flex-wrap gap-2'>
          {modes.map((mode) => (
            <Button
              key={mode}
              variant='outline'
              className={cn('justify-start', {
                'bg-accent text-accent-foreground border-accent':
                  decodeURIComponent(searchParams.get('mode')!) === mode,
              })}
              onClick={() => handleButtonClick('mode', mode)}
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterActions;
