import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidateRequest = {
  type: 'brand' | 'model' | 'year' | 'pricing' | 'reviews';
  brandSlug?: string;
  modelSlug?: string;
  year?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: RevalidateRequest = await request.json();
    const { type, brandSlug, modelSlug, year } = body;

    let tag: string;

    switch (type) {
      case 'brand':
        if (!brandSlug) {
          return NextResponse.json({ success: false, error: 'brandSlug required' }, { status: 400 });
        }
        tag = `brand-${brandSlug}`;
        break;

      case 'model':
        if (!modelSlug) {
          return NextResponse.json({ success: false, error: 'modelSlug required' }, { status: 400 });
        }
        tag = `model-${modelSlug}`;
        break;

      case 'year':
        if (!brandSlug || !modelSlug || !year) {
          return NextResponse.json({ success: false, error: 'brandSlug, modelSlug, and year required' }, { status: 400 });
        }
        tag = `year-${brandSlug}-${modelSlug}-${year}`;
        break;

      case 'pricing':
        if (!brandSlug || !modelSlug || !year) {
          return NextResponse.json({ success: false, error: 'brandSlug, modelSlug, and year required' }, { status: 400 });
        }
        tag = `pricing-${brandSlug}-${modelSlug}-${year}`;
        break;

      case 'reviews':
        if (!brandSlug || !modelSlug || !year) {
          return NextResponse.json({ success: false, error: 'brandSlug, modelSlug, and year required' }, { status: 400 });
        }
        tag = `reviews-${brandSlug}-${modelSlug}-${year}`;
        break;

      default:
        return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 });
    }

    revalidateTag(tag);

    return NextResponse.json({
      success: true,
      revalidated: tag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
