import { redirect } from 'next/navigation';
import { auth } from '@/app/auth-config';
import DashboardLayout from '../components/DashboardLayout';
import PatientsContent from './components/PatientsContent';

export default async function PatientsPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/en/login');
  }

  return (
    <DashboardLayout user={session.user}>
      <PatientsContent />
    </DashboardLayout>
  );
}

