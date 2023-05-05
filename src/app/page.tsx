'use client';

import { Checkbox } from '@/components/ui/checkbox';
// Common components
import { Input } from '@/components/ui/input';
// Hooks
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
  username: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
  createdAt: z.date(),
});

type FormInput = z.infer<typeof FormSchema>;

export default function Home() {
  const { register } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      isAdmin: true,
      createdAt: new Date(),
    },
  });
  return (
    <main className="h-screen mx-auto py-10">
      <div className="max-w-md mx-auto p-8 sm:border border-dashed rounded-lg">
        <form className="flex flex-col gap-y-4">
          <Input id="username" label="Username" {...register('username')} />
          <Input id="email" label="Email" {...register('email')} />
          <div className="flex items-center gap-x-2 cursor-pointer select-none">
            isAdmin
            <Checkbox id="isAdmin" {...register('isAdmin')} />
          </div>
          <Input
            id="createdAt"
            label="Creation Date"
            type="date"
            {...register('createdAt')}
          />
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
