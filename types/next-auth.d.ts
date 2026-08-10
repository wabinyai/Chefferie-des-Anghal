import type { DefaultSession } from 'next-auth';

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'editor'
  | 'translator'
  | 'historian'
  | 'project_manager'
  | 'finance_officer'
  | 'community_contributor'
  | 'researcher';

declare module 'next-auth' {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
