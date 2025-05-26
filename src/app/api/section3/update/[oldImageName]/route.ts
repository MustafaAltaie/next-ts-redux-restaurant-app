import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'section3-images');
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

export async function POST(
  req: NextRequest,
  { params }: { params: { oldImageName: string } }
) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const oldPath = path.join(imageDir, decodeURIComponent(params.oldImageName));
  if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(imageDir, file.name), buffer);

  return NextResponse.json({ success: true });
}