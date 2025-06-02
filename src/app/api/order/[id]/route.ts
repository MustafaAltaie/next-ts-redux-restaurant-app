import dbConnect from "../../../../../lib/mongodb";
import Order from "../../../../../lib/models/OrderModel";
import { NextRequest } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedItem = await Order.findByIdAndDelete(id);
    if (!deletedItem) {
      return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    }

    return new Response(JSON.stringify(deletedItem), { status: 200 });
  } catch (error) {
    console.error('Error occured:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), { status: 500 });
  }
}