import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Chief from '@/models/Chief';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const chief = await Chief.findById(params.id).populate('predecessor successor').lean();
  if (!chief) {
    return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
  }

  return NextResponse.json({
    ...chief,
    _id: chief._id.toString(),
    predecessor: chief.predecessor ? { _id: (chief.predecessor as any)._id.toString(), fullName: (chief.predecessor as any).fullName } : null,
    successor: chief.successor ? { _id: (chief.successor as any)._id.toString(), fullName: (chief.successor as any).fullName } : null
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = await req.json();
  await dbConnect();

  const updated = await Chief.findByIdAndUpdate(params.id, payload, {
    new: true,
    runValidators: true
  }).populate('predecessor successor').lean();

  if (!updated) {
    return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
  }

  return NextResponse.json({
    ...updated,
    _id: updated._id.toString(),
    predecessor: updated.predecessor ? { _id: (updated.predecessor as any)._id.toString(), fullName: (updated.predecessor as any).fullName } : null,
    successor: updated.successor ? { _id: (updated.successor as any)._id.toString(), fullName: (updated.successor as any).fullName } : null
  });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Chief.findByIdAndDelete(params.id).lean();
  if (!deleted) {
    return NextResponse.json({ error: 'Chief not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Chief deleted' });
}
