import { NextResponse } from 'next/server';
import cloudinary from '../../../../../../lib/cloudinary';

export async function DELETE(
  _: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const publicId = `section2-images/${decodeURIComponent(params.filename).split('.')[0]}`;

    const { result } = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true
    });

    return result === 'ok'
      ? NextResponse.json({ success: true })
      : NextResponse.json({ error: 'Deletion failed' }, { status: 500 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}