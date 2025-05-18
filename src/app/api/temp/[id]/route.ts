import dbConnect from '../../../../../lib/mongodb';
import TempModel from '../../../../../lib/models/TempModel';
import { NextRequest } from 'next/server';

// params routes

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await TempModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update' }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedTemp = await TempModel.findByIdAndDelete(id);
    if (!deletedTemp) {
      return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    }

    return new Response(JSON.stringify(deletedTemp), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete temp' }), { status: 500 });
  }
}