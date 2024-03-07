import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { View } from '@/pages/action';
import { useSearchParams } from 'react-router-dom';

const types = [
  'Formation corporate',
  'Formation induction',
  'Formation de reconversion',
  'Perfectionnement',
  'Stages fournisseurs',
  'Formation/recrutement',
];
const domaines = ['FST', 'FCM', 'FSP'];
const codeFormations = ['CDA', 'CDI', 'CDE', 'LDA', 'LDI', 'LDE'];
const modes = ['Blended', 'Distanciel', 'Présentiel'];

const csp = ['C', 'M', 'CS'];
const sexe = ['Masculin', 'Féminin'];

function FilterActions() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') as View;

  return (
    <div className='flex flex-col gap-8'>
      <FilterLayout
        title='type'
        filterValues={types}
      />
      <FilterLayout
        title='domaine'
        filterValues={domaines}
      />
      <FilterLayout
        title='code formation'
        filterValues={codeFormations}
      />
      <FilterLayout
        title='mode'
        filterValues={modes}
      />
      {view === 'single' && (
        <>
          <FilterLayout
            title='csp'
            filterValues={csp}
          />
          <FilterLayout
            title='sexe'
            filterValues={sexe}
          />
        </>
      )}
    </div>
  );
}

export default FilterActions;

function FilterLayout({
  title,
  filterValues,
}: {
  title: string;
  filterValues: string[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (key: string, value: string) => {
    setSearchParams((prev) => {
      const _searchParams = new URLSearchParams(prev);
      const oldValue = _searchParams.get(key);
      const _value = encodeURIComponent(value);

      if (oldValue && oldValue === _value) {
        _searchParams.delete(key);
      } else {
        _searchParams.set(key, _value);
      }

      return _searchParams;
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-medium uppercase'>{title}</p>
      <div className='flex flex-wrap gap-2'>
        {filterValues.map((filterValue) => (
          <Button
            key={filterValue}
            variant='outline'
            className={cn('justify-start', {
              'bg-accent text-accent-foreground border-accent-border ring-accent':
                decodeURIComponent(
                  searchParams.get(
                    title.replace(
                      /(\s)(.)/,
                      (_fullMatch, _firstMatch, secondMatch: string) =>
                        secondMatch.toUpperCase()
                    )
                  )!
                ) === filterValue,
            })}
            onClick={() =>
              handleClick(
                title.replace(
                  /(\s)(.)/,
                  (_fullMatch, _firstMatch, secondMatch: string) =>
                    secondMatch.toUpperCase()
                ),
                filterValue
              )
            }
          >
            {filterValue}
          </Button>
        ))}
      </div>
    </div>
  );
}
