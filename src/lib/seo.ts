import { Metadata } from 'next';

type SafeMetadataOptions = {
  brandSlug?: string;
  modelSlug?: string;
  year?: string;
  brandInfo?: { name: string; country?: string; founded?: number } | null;
  modelInfo?: { name: string; category?: string; bodyType?: string } | null;
  yearInfo?: { year: string; engine?: string; horsepower?: string } | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

function formatSlug(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function generateSafeMetadata(options: SafeMetadataOptions): Metadata {
  const { brandSlug, modelSlug, year, brandInfo, modelInfo, yearInfo } = options;

  // Fallback values
  const brandName = brandInfo?.name || (brandSlug ? formatSlug(brandSlug) : 'Car & Bike');
  const modelName = modelInfo?.name || (modelSlug ? formatSlug(modelSlug) : '');
  const yearValue = yearInfo?.year || year || '';

  // Build title
  let title = 'Car & Bike History';
  let description = 'Explore vehicle history, specifications, pricing and reviews.';
  let url = BASE_URL;

  if (year && modelSlug && brandSlug) {
    title = `${yearValue} ${brandName} ${modelName} - Specifications`;
    description = `Complete specifications, features, and history of ${yearValue} ${brandName} ${modelName}. Detailed year-specific information.`;
    url = `${BASE_URL}/brands/${brandSlug}/models/${modelSlug}/years/${year}`;
  } else if (modelSlug && brandSlug) {
    title = `${brandName} ${modelName} - Models`;
    description = `Detailed specifications, features, and history of ${brandName} ${modelName}. Complete model information.`;
    url = `${BASE_URL}/brands/${brandSlug}/models/${modelSlug}`;
  } else if (brandSlug) {
    title = `${brandName} - Brand`;
    description = `Explore ${brandName} vehicles, models, and specifications. Complete history and information.`;
    url = `${BASE_URL}/brands/${brandSlug}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Build Car & Bike History',
    },
    alternates: {
      canonical: url,
    },
  };
}
