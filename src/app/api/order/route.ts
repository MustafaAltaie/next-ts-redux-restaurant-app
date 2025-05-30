import dbConnect from '../../../../lib/mongodb';
import Order from '../../../../lib/models/OrderModel';

export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const savedData = new Order(data);
    await savedData.save();
    return new Response(JSON.stringify(savedData), { status: 201 });
}

export async function GET() {
    await dbConnect();
    const data = await Order.find({});
    return new Response(JSON.stringify(data), { status: 200 });
}