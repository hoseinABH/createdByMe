import { ReactNode, useState } from 'react';
// Common components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
// Libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
// Hooks
import { useForm } from 'react-hook-form';
import { toast } from './ui/use-toast';
// Utilities
import { ProfileFormSchema } from '@/lib/validations/profile';
// Icons
import { CheckCircle2 } from 'lucide-react';
// Types
import type { CheckedState } from '@radix-ui/react-checkbox';

type FormInput = z.infer<typeof ProfileFormSchema>;

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserForm({ className, ...props }: UserFormProps) {
  const [checked, setChecked] = useState<CheckedState>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      isAdmin: false,
      createdAt: '',
    },
  });

  function onSubmit(data: FormInput) {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: (
          <div className="flex items-center gap-x-2">
            <CheckCircle2 className="text-green-600" /> Cool
          </div>
        ) as any,
        description: 'data has been stored in database',
        variant: 'default',
      });
      console.log(data);
      setLoading(false);
    }, 2000);
  }

  function onCheckedChange(checked: CheckedState) {
    setChecked(checked);
    setValue('isAdmin', checked as boolean);
  }

  return (
    <div
      className={clsx(
        'max-w-md mx-auto p-4 sm:p-8 sm:border border-dashed rounded-lg bg-white',
        className
      )}
      {...props}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="username"
          label="Username"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          id="email"
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <div className="flex items-center gap-x-2 select-none">
          IsAdmin
          <Checkbox
            defaultChecked={false}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </div>
        <Input
          id="createdAt"
          label="Creation Date"
          type="date"
          {...register('createdAt')}
          error={errors.createdAt?.message}
        />
        <Button
          variant="default"
          loading={loading}
          className="mt-6"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
