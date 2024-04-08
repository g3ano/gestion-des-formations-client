import Avatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ActionCreateContext } from '@/pages/action';
import { Formation } from '@/pages/formation';
import { NotebookText } from 'lucide-react';

const FormationSearchResultItem = ({ formation }: { formation: Formation }) => {
  const { action, setAction, preview, setPreview } = ActionCreateContext();
  const handleAddFormationToAction = () => {
    setAction((prev) => ({
      ...prev,
      action: {
        ...prev.action,
        formationId: formation.attributes.id,
      },
    }));
    setPreview((prev) => ({
      ...prev,
      formation: formation.relationships.intitule.intitule,
    }));
  };

  return (
    <div
      className={cn(
        'relative isolate flex w-full items-center gap-4 rounded-lg px-3 py-3 hover:bg-card/75',
        {
          'bg-green-600/15 hover:bg-green-600/25':
            preview.formation === formation.relationships.intitule.intitule &&
            action.action.formationId === formation.attributes.id,
        }
      )}
      onClick={handleAddFormationToAction}
    >
      <div
        className={cn('absolute inset-0 -z-10 rounded-lg', {
          'bg-green-600/15':
            preview.formation === formation.relationships.intitule.intitule &&
            action.action.formationId === formation.attributes.id,
        })}
      ></div>
      <div className='flex w-full items-center gap-4'>
        <Avatar icon={NotebookText} />
        <p className='line-clamp-2'>
          {formation.relationships.intitule.intitule}
        </p>
      </div>
    </div>
  );
};

export default FormationSearchResultItem;
