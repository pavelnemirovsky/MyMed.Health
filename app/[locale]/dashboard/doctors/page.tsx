import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../../dashboard/components/DashboardLayout';
import DoctorsContent from '../../../dashboard/doctors/components/DoctorsContent';

export default async function DoctorsPage({
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
      <DoctorsContent />
    </DashboardLayout>
  );
}


