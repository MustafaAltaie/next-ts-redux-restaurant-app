import dbConnect from "../../../../lib/mongodb";
import Member from "../../../../lib/models/MemberSection";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Member(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Member.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}