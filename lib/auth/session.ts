import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import type { UserRole } from '@/types/next-auth';
import { authOptions } from '@/lib/auth/options';

const CMS_ROLES = new Set<UserRole>([
  'super_admin',
  'admin',
  'editor',
  'historian'
]);

export function canManageChiefs(role: UserRole | undefined): boolean {
  return role ? CMS_ROLES.has(role) : false;
}

export async function getCmsSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  return canManageChiefs(session?.user?.role) ? session : null;
}
