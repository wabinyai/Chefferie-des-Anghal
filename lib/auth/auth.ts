import { MongooseAdapter } from '@auth/mongoose-adapter';
import { authOptions as nextAuthOptions } from '@/lib/auth/options';
import dbConnect from '@/lib/db/mongoose';

export async function getAuthOptions(req: Request) {
  await dbConnect();
  return nextAuthOptions;
}
