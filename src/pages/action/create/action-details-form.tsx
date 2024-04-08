import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ActionCreateContext } from '@/pages/action';
import { addDays, format, fromUnixTime, getUnixTime, getYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

function ActionDetailsForm() {
  const { action, setAction } = ActionCreateContext();

  return (
    <>
      <p className='mb-8'>
        Remplissez les informations de l&apos;action, par exemple la date de
        début et la date de fin ainsi que les prévisions (facultatif)
      </p>

      <div className='flex gap-4'>
        <div className='flex flex-none grow flex-col'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'min-w-64 justify-start gap-2 bg-card px-2 text-left font-normal normal-case text-muted-foreground shadow shadow-black/10'
                )}
              >
                <Icon render={CalendarIcon} size='sm' />
                {action?.action.dateDebut ? (
                  format(fromUnixTime(action.action.dateDebut), 'dd/MM/y')
                ) : (
                  <span>Choisir un date de debut</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='start'>
              <Calendar
                mode='single'
                locale={fr}
                onDayClick={(date) => {
                  if (date) {
                    setAction((prev) => ({
                      ...prev,
                      action: {
                        ...prev.action,
                        dateDebut: getUnixTime(format(date, 'y-MM-dd')),
                      },
                    }));
                  }
                }}
                initialFocus
                selected={
                  action?.action.dateDebut
                    ? fromUnixTime(action?.action.dateDebut)
                    : new Date()
                }
                captionLayout='dropdown-buttons'
                fromYear={1970}
                toYear={getYear(new Date())}
                toMonth={new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-none grow flex-col'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'min-w-64 justify-start gap-2 bg-card px-2 text-left font-normal normal-case text-muted-foreground shadow shadow-black/10'
                )}
                disabled={!action?.action.dateDebut}
              >
                <Icon render={CalendarIcon} size='sm' />
                {action?.action.dateFin ? (
                  format(fromUnixTime(action.action.dateFin), 'dd/MM/y')
                ) : (
                  <span>Choisir un date de fin</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0' align='start'>
              {action?.action.dateDebut && (
                <Calendar
                  mode='single'
                  locale={fr}
                  onDayClick={(date) => {
                    if (date) {
                      setAction((prev) => ({
                        ...prev,
                        action: {
                          ...prev.action,
                          dateFin: getUnixTime(format(date, 'y-MM-dd')),
                        },
                      }));
                    }
                  }}
                  initialFocus
                  selected={
                    action.action.dateFin
                      ? fromUnixTime(action?.action.dateFin)
                      : new Date()
                  }
                  disabled={{
                    before: addDays(fromUnixTime(action.action.dateDebut), 1),
                  }}
                  captionLayout='dropdown-buttons'
                  fromYear={1970}
                  toYear={getYear(new Date())}
                  toMonth={new Date()}
                />
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className='mt-4'>
        <Input
          value={action?.action.prevision}
          placeholder='Enterer les prévisions...'
          onChange={(e) =>
            setAction((prev) => ({
              ...prev,
              action: {
                ...prev.action,
                prevision: e.target.value,
              },
            }))
          }
        />
      </div>
    </>
  );
}

export default ActionDetailsForm;
