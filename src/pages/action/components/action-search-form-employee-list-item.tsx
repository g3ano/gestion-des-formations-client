import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ActionCreateContext, ActionFormData } from '@/pages/action';
import { Employee } from '@/pages/employee';
import { Check, Dot, Plus, Trash2, User2 } from 'lucide-react';
import { useState } from 'react';

const EmployeeSearchResultItem = ({ employee }: { employee: Employee }) => {
  const [showInput, setShowInput] = useState(false);
  const [employeeFormData, setEmployeeFormData] = useState<
    ActionFormData['participants'][0]
  >({
    employeeId: employee.attributes.id,
    observation: '',
  });
  const { action, setAction, preview, setPreview } = ActionCreateContext();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(
    !!action.participants.find(
      (participant) => participant.employeeId === employee.attributes.id
    )?.employeeId
  );

  const handleAddEmployeeToAction = (
    employeeFormData: ActionFormData['participants'][0],
    employee: Employee
  ) => {
    setAction((prev) => ({
      ...prev,
      participants: [...prev.participants, employeeFormData],
    }));
    setPreview((prev) => ({
      ...prev,
      participants: [
        ...prev.participants,
        {
          id: employee.attributes.id,
          fullName: `${employee.attributes.nom} ${employee.attributes.prenom}`,
          matricule: employee.attributes.matricule,
          observation: employeeFormData.observation,
        },
      ],
    }));
  };

  const handleRemoveEmployeeFromAction = (employeeId: number) => {
    setAction((prev) => {
      const newParticipants = action?.participants.filter(
        (participant) => participant && participant.employeeId !== employeeId
      );
      return {
        ...prev,
        participants: newParticipants,
      };
    });

    setPreview((prev) => {
      const newParticipants = preview.participants.filter(
        (participant) => participant && participant.id !== employeeId
      );
      return {
        ...prev,
        participants: newParticipants,
      };
    });
  };

  return (
    <div
      className={cn(
        'relative isolate flex w-full gap-4 rounded-lg px-3 py-3 hover:bg-card/75',
        {
          'flex-col': showInput,
          'bg-green-600/15 hover:bg-green-600/25': isSelected,
          'bg-red-500/15 hover:bg-red-600/25': isSelected && isButtonHovered,
        }
      )}
      onClick={() => {
        setShowInput((prev) => !prev);
      }}
    >
      <div
        className={cn('absolute inset-0 -z-10 rounded-lg', {
          'flex-col': showInput,
          'bg-green-600/15': isSelected,
          'bg-red-500/15': isSelected && isButtonHovered,
        })}
      ></div>
      <div className='flex w-full items-center gap-4'>
        <div className='flex w-full items-center gap-4'>
          <Avatar icon={User2} />
          <div className='flex flex-1 items-center gap-2'>
            <div className='flex items-center gap-1'>
              <p>{employee.attributes.nom}</p>
              <p>{employee.attributes.prenom}</p>
            </div>
            <Icon render={Dot} className='text-muted-foreground' />
            <span>{employee.attributes.matricule}</span>
          </div>
          {showInput && !isSelected ? (
            <Button
              onClick={() => {
                handleAddEmployeeToAction(employeeFormData, employee);
                setIsSelected(true);
                setEmployeeFormData({
                  employeeId: employee.attributes.id,
                  observation: '',
                });
                setShowInput(false);
              }}
            >
              Ajouter
            </Button>
          ) : null}
        </div>
        {isSelected && (
          <Button
            variant='ghost'
            size='icon'
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) {
                handleRemoveEmployeeFromAction(employee.attributes.id);
                setIsSelected(false);
              }
              setShowInput(false);
            }}
          >
            <Icon
              render={isSelected ? (isButtonHovered ? Trash2 : Check) : Plus}
              className={cn('transition-transform duration-200')}
            />
          </Button>
        )}
      </div>
      {showInput && !isSelected ? (
        <div className='w-full select-none px-0.5 transition-transform duration-200'>
          <Input
            value={employeeFormData?.observation}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setEmployeeFormData((prev) => ({
                ...prev,
                observation: e.target.value,
              }))
            }
            placeholder="Ajouter une observation pour l'employee (facultatif)..."
          />
        </div>
      ) : null}
    </div>
  );
};

export default EmployeeSearchResultItem;
