import dbConnect from "../../../../lib/mongodb";
import Milkshakes from "../../../../lib/models/Section2Model";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Milkshakes(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Milkshakes.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}