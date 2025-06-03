import { NextResponse } from 'next/server';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE(
  _: Request,
  { params }: { params: { publicId: string } }
) {
  try {
    const decodedPublicId = decodeURIComponent(params.publicId);
    const { result } = await cloudinary.uploader.destroy(decodedPublicId);
    return NextResponse.json({ success: result === 'ok' });
  } catch (error) {
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}