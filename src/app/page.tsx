'use client';

import { UserForm } from '@/components/UserForm';

export default function Home() {
  return (
    <main className="h-screen mx-auto py-10 bg-white sm:bg-muted">
      <UserForm />
    </main>
  );
}
