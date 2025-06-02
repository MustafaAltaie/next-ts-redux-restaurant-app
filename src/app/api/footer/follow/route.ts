import dbConnect from "../../../../../lib/mongodb";
import FollowLink from "../../../../../lib/models/FooterFollowModel";

export async function PATCH(req: Request) {
  await dbConnect();
  const body = await req.json();
  const updatedRecord = await FollowLink.findByIdAndUpdate(
    'singleton_footer_follow_links',
    { $set: body },
    { new: true, upsert: true }
  );
  return new Response(JSON.stringify(updatedRecord), { status: 200 });
}

export async function GET() {
  await dbConnect();
  const items = await FollowLink.findOne({});
  return new Response(JSON.stringify(items), { status: 200 });
}