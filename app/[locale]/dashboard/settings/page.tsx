import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../../../dashboard/components/DashboardLayout';
import SettingsContent from '../../../dashboard/settings/components/SettingsContent';

export default async function SettingsPage({
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

  // Check if user is SSO (has accessToken means OAuth login)
  const isSSO = !!session.accessToken;

  return (
    <DashboardLayout user={session.user}>
      <SettingsContent user={session.user} isSSO={isSSO} />
    </DashboardLayout>
  );
}

