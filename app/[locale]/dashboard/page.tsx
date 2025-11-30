import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../dashboard/components/DashboardLayout';
import DashboardContent from '../../dashboard/components/DashboardContent';

export default async function DashboardPage({
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
      <DashboardContent />
    </DashboardLayout>
  );
}


