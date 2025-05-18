import dbConnect from '../../../../lib/mongodb';
import TempModel from '../../../../lib/models/TempModel';

// no params routes

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new TempModel(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await TempModel.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}