import dbConnect from "../../../../lib/mongodb";
import Contact from "../../../../lib/models/FooterModel";

export async function PATCH(req: Request) {
  await dbConnect();
  const body = await req.json();
  const updatedRecord = await Contact.findByIdAndUpdate(
    'singleton_footer_Contact_information',
    { $set: body },
    { new: true, upsert: true }
  );
  return new Response(JSON.stringify(updatedRecord), { status: 200 });
}

export async function GET() {
  await dbConnect();
  const items = await Contact.findOne({});
  return new Response(JSON.stringify(items), { status: 200 });
}