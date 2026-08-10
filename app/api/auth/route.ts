import { auth } from '@auth/nextjs';
import { authOptions } from '@/lib/auth/options';

export const GET = auth(authOptions);
export const POST = auth(authOptions);
