import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../../../../lib/cloudinary';
import { Readable } from 'stream';

export async function POST(
  req: NextRequest,
  context: { params: { oldImageName: string } }
): Promise<NextResponse> {
  try {
    const { oldImageName } = context.params;

    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replace(/\.[^/.]+$/, ''); // Remove extension for public_id

    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(`section3-images/${oldImageName.replace(/\.[^/.]+$/, '')}`);

    // Upload new image with your custom name
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'section3-images',
          public_id: filename, // use the frontend-assigned name
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    return NextResponse.json({ success: true, data: uploadResult });
  } catch (error) {
    console.error('Cloudinary update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}