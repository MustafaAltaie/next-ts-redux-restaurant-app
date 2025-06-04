import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '../../../../../../lib/cloudinary';
import { Readable } from 'stream';

export async function POST(
  req: NextRequest,
  { params }: { params: { oldImageName: string } }
): Promise<NextResponse> {
  try {
    const { oldImageName } = params;

    // 1. Parse the incoming FormData
    const formData = await req.formData();
    const file = formData.get('image') as File;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. Convert the File into a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    // Strip extension for public_id (we assume frontend named it with Date.now())
    const publicId = file.name.replace(/\.[^/.]+$/, '');

    // 3. Delete the old image (strip its extension too)
    const oldPublicId = oldImageName.replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(`section3-images/${oldPublicId}`);

    // 4. Upload the new buffer, piping it into Cloudinary's upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'section3-images',
          public_id: publicId,
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
  } catch (err) {
    console.error('Cloudinary update error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}