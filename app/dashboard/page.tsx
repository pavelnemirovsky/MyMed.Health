import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from './components/DashboardLayout';
import DashboardContent from './components/DashboardContent';

export default async function DashboardPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardLayout user={session.user}>
      <DashboardContent />
    </DashboardLayout>
  );
}

