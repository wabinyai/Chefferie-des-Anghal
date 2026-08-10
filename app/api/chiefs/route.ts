import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import dbConnect from '@/lib/db/mongoose';
import { chiefInputSchema, serializeChief, type ChiefRecord } from '@/lib/chiefs';
import { getCmsSession } from '@/lib/auth/session';
import Chief from '@/models/Chief';

const CHIEF_FIELDS = 'order fullName customaryName portrait reignStart reignEnd predecessor successor biography status';

export async function GET() {
  try {
    const session = await getCmsSession();
    await dbConnect();

    const filter = session ? {} : { status: 'published' };
    const chiefs = await Chief.find(filter)
      .select(CHIEF_FIELDS)
      .sort({ order: 1 })
      .populate('predecessor successor', 'fullName')
      .lean<ChiefRecord[]>();

    return NextResponse.json(chiefs.map(serializeChief));
  } catch (error) {
    console.error('Unable to load chiefs', error);
    return NextResponse.json({ error: 'Unable to load chiefs.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getCmsSession();
  if (!session) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  try {
    const payload = chiefInputSchema.parse(await req.json());
    await dbConnect();

    const chief = await Chief.create({
      ...payload,
      biography: payload.biography ?? '',
      status: payload.status ?? 'published',
      createdBy: session.user.id,
      updatedBy: session.user.id
    });

    return NextResponse.json(
      { message: 'Chief created', chief: serializeChief(chief.toObject() as ChiefRecord) },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError || error instanceof SyntaxError) {
      return NextResponse.json({ error: 'The submitted chief data is invalid.' }, { status: 400 });
    }
    console.error('Unable to create chief', error);
    return NextResponse.json({ error: 'Unable to create chief.' }, { status: 500 });
  }
}
