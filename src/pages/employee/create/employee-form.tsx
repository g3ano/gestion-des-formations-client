import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Csp, Sexe } from '@/pages/employee';
import { EmployeeCreateContext } from '@/pages/employee/create';
import { format, getYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

function EmployeeForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { employee, setEmployee } = EmployeeCreateContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-center gap-4'>
          <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
          <span className='font-medium text-xl'>Employee</span>
          <div className='mt-1 flex-1 bg-accent-foreground/20 h-px'></div>
        </div>
        <div className='space-y-8'>
          <div className='flex items-center gap-4'>
            <Label
              label='matricule'
              htmlFor='matricule'
            >
              <Input
                name='matricule'
                id='matricule'
                value={employee.matricule}
                onChange={handleChange}
                placeholder="Entrer matricule d'employee..."
                maxLength={50}
              />
            </Label>
            <Label
              label='direction'
              htmlFor='Direction'
            >
              <Input
                name='direction'
                id='direction'
                value={employee.direction}
                onChange={handleChange}
                placeholder='Entrer direction...'
                maxLength={50}
              />
            </Label>
            <Label
              htmlFor='localite'
              label='Localite'
            >
              <Input
                name='localite'
                id='localite'
                value={employee.localite}
                onChange={handleChange}
                placeholder="Entrer localite d'employee..."
                maxLength={50}
              />
            </Label>
          </div>
          <div className='flex items-center gap-4'>
            <Label
              htmlFor='nom'
              label='Nom'
            >
              <Input
                name='nom'
                id='nom'
                value={employee.nom}
                onChange={handleChange}
                placeholder="Entrer nom d'employee..."
                maxLength={50}
              />
            </Label>
            <Label
              htmlFor='prenom'
              label='prenom'
            >
              <Input
                name='prenom'
                id='prenom'
                value={employee.prenom}
                onChange={handleChange}
                placeholder="Entrer prenom d'employee..."
                maxLength={50}
              />
            </Label>

            <Label
              label='sexe'
              htmlFor='sexe'
            >
              <Select
                name='sexe'
                value={employee.sexe}
                onValueChange={(value: Sexe) =>
                  setEmployee((prev) => ({
                    ...prev,
                    sexe: value,
                  }))
                }
              >
                <SelectTrigger
                  className='w-full'
                  id='sexe'
                >
                  <SelectValue placeholder='Choisir sexe...' />
                </SelectTrigger>
                <SelectContent align='end'>
                  <SelectItem value='M'>Masculaine</SelectItem>
                  <SelectItem value='F'>Feminine</SelectItem>
                </SelectContent>
              </Select>
            </Label>
          </div>
          <div className='flex items-center gap-4'>
            <Label
              label='csp'
              htmlFor='CSP'
            >
              <Select
                name='csp'
                value={employee.csp}
                onValueChange={(value: Csp) =>
                  setEmployee((prev) => ({
                    ...prev,
                    csp: value,
                  }))
                }
              >
                <SelectTrigger
                  className='w-full'
                  id='csp'
                >
                  <SelectValue placeholder='Choisir csp...' />
                </SelectTrigger>
                <SelectContent align='end'>
                  <SelectItem value='C'>C</SelectItem>
                  <SelectItem value='M'>M</SelectItem>
                  <SelectItem value='CS'>CS</SelectItem>
                </SelectContent>
              </Select>
            </Label>
            <Label
              htmlFor='email'
              label='Email'
            >
              <Input
                name='email'
                id='email'
                type='email'
                value={employee.email}
                onChange={handleChange}
                placeholder="Entrer email d'employee..."
                maxLength={255}
              />
            </Label>
            <Label
              htmlFor='date_naissance'
              label='Date naissance'
              className='flex flex-col flex-none'
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='ghost'
                    className={cn(
                      'min-w-64 justify-start gap-2 text-left font-normal bg-card normal-case px-2',
                      { 'text-muted-foreground': !selectedDate }
                    )}
                  >
                    <Icon
                      render={CalendarIcon}
                      size='sm'
                    />
                    {selectedDate ? (
                      format(selectedDate, 'y-MM-dd')
                    ) : (
                      <span>Choisir un date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='p-0'
                  align='start'
                >
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onDayClick={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setEmployee((prev) => ({
                          ...prev,
                          date_naissance: format(date, 'y-MM-dd'),
                        }));
                      }
                    }}
                    initialFocus
                    disabled={{
                      after: new Date(),
                    }}
                    captionLayout='dropdown-buttons'
                    fromYear={1945}
                    toYear={getYear(new Date())}
                    toMonth={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </Label>
            <Label
              htmlFor='lieu_naissance'
              label='Lieu naissance'
            >
              <Input
                name='lieu_naissance'
                id='lieu_naissance'
                value={employee.lieu_naissance}
                onChange={handleChange}
                placeholder="Entrer lieu naissance d'employee..."
                maxLength={255}
              />
            </Label>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeForm;
