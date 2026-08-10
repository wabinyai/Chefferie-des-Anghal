import { Types } from 'mongoose';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import dbConnect from '@/lib/db/mongoose';
import { chiefPatchSchema, serializeChief, type ChiefRecord } from '@/lib/chiefs';
import { getCmsSession } from '@/lib/auth/session';
import Chief from '@/models/Chief';

type RouteContext = { params: Promise<{ id: string }> };
const CHIEF_FIELDS = 'order fullName customaryName portrait reignStart reignEnd predecessor successor biography status';

async function getValidId(context: RouteContext) {
  const { id } = await context.params;
  return Types.ObjectId.isValid(id) ? id : null;
}

export async function GET(_req: Request, context: RouteContext) {
  const id = await getValidId(context);
  if (!id) {
    return NextResponse.json({ error: 'Invalid chief identifier.' }, { status: 400 });
  }

  try {
    const session = await getCmsSession();
    await dbConnect();
    const filter = session ? { _id: id } : { _id: id, status: 'published' };
    const chief = await Chief.findOne(filter)
      .select(CHIEF_FIELDS)
      .populate('predecessor successor', 'fullName')
      .lean<ChiefRecord>();

    if (!chief) {
      return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
    }

    return NextResponse.json(serializeChief(chief));
  } catch (error) {
    console.error('Unable to load chief', error);
    return NextResponse.json({ error: 'Unable to load chief.' }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: RouteContext) {
  const session = await getCmsSession();
  if (!session) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const id = await getValidId(context);
  if (!id) {
    return NextResponse.json({ error: 'Invalid chief identifier.' }, { status: 400 });
  }

  try {
    const payload = chiefPatchSchema.parse(await req.json());
    await dbConnect();
    const updated = await Chief.findByIdAndUpdate(
      id,
      { ...payload, updatedBy: session.user.id },
      { new: true, runValidators: true }
    )
      .select(CHIEF_FIELDS)
      .populate('predecessor successor', 'fullName')
      .lean<ChiefRecord>();

    if (!updated) {
      return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
    }

    return NextResponse.json(serializeChief(updated));
  } catch (error) {
    if (error instanceof ZodError || error instanceof SyntaxError) {
      return NextResponse.json({ error: 'The submitted chief data is invalid.' }, { status: 400 });
    }
    console.error('Unable to update chief', error);
    return NextResponse.json({ error: 'Unable to update chief.' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  const session = await getCmsSession();
  if (!session) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const id = await getValidId(context);
  if (!id) {
    return NextResponse.json({ error: 'Invalid chief identifier.' }, { status: 400 });
  }

  try {
    await dbConnect();
    const referenced = await Chief.exists({
      $or: [{ predecessor: id }, { successor: id }]
    });
    if (referenced) {
      return NextResponse.json(
        { error: 'Remove this chief from succession links before deleting it.' },
        { status: 409 }
      );
    }

    const deleted = await Chief.findByIdAndDelete(id).select('_id').lean();
    if (!deleted) {
      return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Chief deleted' });
  } catch (error) {
    console.error('Unable to delete chief', error);
    return NextResponse.json({ error: 'Unable to delete chief.' }, { status: 500 });
  }
}
