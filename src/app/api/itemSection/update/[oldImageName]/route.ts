import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'itemSection');
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ oldImageName: string }> }
) {
  // 1) Await the `params` promise so we can pull out oldImageName:
  const { oldImageName } = await params;

  // 2) Read the incoming FormData and get the new file
  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // 3) Delete the old image if it exists
  const decodedOld = decodeURIComponent(oldImageName);
  const oldPath = path.join(imageDir, decodedOld);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  // 4) Save the new file under its filename
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(imageDir, file.name), buffer);

  return NextResponse.json({ success: true });
}