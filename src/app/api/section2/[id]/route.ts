import Milkshakes from '../../../../../lib/models/Section2Model';
import dbConnect from '../../../../../lib/mongodb';
import { NextRequest } from 'next/server';

// params routes

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const data = await req.json();

  try {
    const updated = await Milkshakes.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error('Error occured:', error);
    return new Response(JSON.stringify({ error: 'Failed to update' }), { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const deletedItem = await Milkshakes.findByIdAndDelete(id);
    if (!deletedItem) {
      return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    }

    return new Response(JSON.stringify(deletedItem), { status: 200 });
  } catch (error) {
    console.error('Error occured:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), { status: 500 });
  }
}