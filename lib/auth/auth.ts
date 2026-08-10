import dbConnect from '@/lib/db/mongoose';
import { authOptions } from '@/lib/auth/options';

export async function getAuthOptions() {
  await dbConnect();
  return authOptions;
}
