import dbConnect from "../../../../lib/mongodb";
import Item from "../../../../lib/models/ItemSectionModel";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Item(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Item.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}