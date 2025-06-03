import { NextResponse } from 'next/server';
import cloudinary from '../../../../../../lib/cloudinary';

export async function DELETE(
  _: Request,
  context: { params: { filename: string } }
) {
  try {
    const filename = context.params.filename;
    const publicId = `section2-images/${decodeURIComponent(filename).split('.')[0]}`;

    const { result } = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}