import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../../dashboard/components/DashboardLayout';
import MedicalProvidersContent from '../../../dashboard/medical-providers/components/MedicalProvidersContent';

export default async function MedicalProvidersPage({
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
      <MedicalProvidersContent />
    </DashboardLayout>
  );
}


