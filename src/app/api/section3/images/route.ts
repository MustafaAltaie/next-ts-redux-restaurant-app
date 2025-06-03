import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../../../lib/cloudinary';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file) {
    console.log('❌ No file found in request');
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'section3-images',
        public_id: file.name.split('.').slice(0, -1).join(''),
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });

    console.log('✅ Upload success:', result);
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

type CloudinaryResource = {
  secure_url: string;
}

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:section3-images AND resource_type:image')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    const urls = result.resources.map((file: CloudinaryResource) => file.secure_url);

    return NextResponse.json(urls);
  } catch (error) {
    console.error('❌ Cloudinary fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}