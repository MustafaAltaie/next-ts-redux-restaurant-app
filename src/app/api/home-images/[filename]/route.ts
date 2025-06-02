import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'home-images');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
    if (!filename) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const decodedFilename = decodeURIComponent(filename);
    const filePath = path.join(imageDir, decodedFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}