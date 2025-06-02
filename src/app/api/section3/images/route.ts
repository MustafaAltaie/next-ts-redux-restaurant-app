import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'section3-images');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('image') as File[];

  if (!files.length) {
    return NextResponse.json({ error: 'No images uploaded' }, { status: 400 });
  }

  try {
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(imageDir, file.name);

      fs.writeFileSync(filePath, buffer);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error occured:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const files = fs.existsSync(imageDir)
      ? fs.readdirSync(imageDir).filter((f) => /\.(png|jpe?g|gif|webp|svg)$/i.test(f))
      : [];

    const urls = files.map((filename) => `/section3-images/${filename}`);

    return NextResponse.json(urls);
  } catch (error) {
    console.error('Error occured:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}