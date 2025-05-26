import dbConnect from "../../../../lib/mongodb";
import Dishes from "../../../../lib/models/Section3Model";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Dishes(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Dishes.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}