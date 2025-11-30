import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../../dashboard/components/DashboardLayout';
import MessagesContent from '../../../dashboard/messages/components/MessagesContent';

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <DashboardLayout user={session.user}>
      <Suspense fallback={<div>Loading...</div>}>
        <MessagesContent user={session.user} />
      </Suspense>
    </DashboardLayout>
  );
}

