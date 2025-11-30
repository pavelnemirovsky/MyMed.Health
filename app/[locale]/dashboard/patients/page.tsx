import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../../dashboard/components/DashboardLayout';
import PatientsContent from '../../../dashboard/patients/components/PatientsContent';

export default async function PatientsPage({
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
      <PatientsContent />
    </DashboardLayout>
  );
}


