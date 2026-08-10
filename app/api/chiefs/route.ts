import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Chief from '@/models/Chief';

export async function GET() {
  await dbConnect();
  const chiefs = await Chief.find().sort('order').populate('predecessor successor').lean();
  return NextResponse.json(chiefs.map((chief) => ({
    ...chief,
    _id: chief._id.toString(),
    predecessor: chief.predecessor ? { _id: (chief.predecessor as any)._id.toString(), fullName: (chief.predecessor as any).fullName } : null,
    successor: chief.successor ? { _id: (chief.successor as any)._id.toString(), fullName: (chief.successor as any).fullName } : null
  })));
}

export async function POST(req: Request) {
  const payload = await req.json();
  const {
    order,
    fullName,
    customaryName,
    portrait,
    reignStart,
    reignEnd,
    predecessor,
    successor,
    biography
  } = payload;

  if (!fullName || !customaryName || typeof order !== 'number') {
    return NextResponse.json({ error: 'Order, fullName and customaryName are required.' }, { status: 400 });
  }

  await dbConnect();

  const chief = await Chief.create({
    order,
    fullName,
    customaryName,
    portrait,
    reignStart,
    reignEnd,
    predecessor: predecessor || undefined,
    successor: successor || undefined,
    biography: biography || '',
    status: 'published'
  });

  return NextResponse.json({ message: 'Chief created', chief: { ...chief.toObject(), _id: chief._id.toString() } });
}
