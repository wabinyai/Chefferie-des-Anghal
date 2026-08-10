import { redirect } from 'next/navigation';
import { getCmsSession } from '@/lib/auth/session';

export default async function AdminChiefsLayout({ children }: { children: React.ReactNode }) {
  const session = await getCmsSession();
  if (!session) {
    redirect('/admin/login');
  }

  return children;
}
