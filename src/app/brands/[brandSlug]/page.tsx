import { Metadata } from 'next';
import { getBrandInfo, safeFetch } from '@/lib/api';
import { generateSafeMetadata } from '@/lib/seo';

export const revalidate = 3600;

type Props = {
  params: Promise<{ brandSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug } = await params;
  
  const brandInfo = await safeFetch(
    () => getBrandInfo(brandSlug),
    null
  );
  
  return generateSafeMetadata({
    brandSlug,
    brandInfo,
  });
}

export default async function BrandPage({ params }: Props) {
  const { brandSlug } = await params;

  const brand = await safeFetch(
    () => getBrandInfo(brandSlug),
    { name: brandSlug, country: 'N/A', founded: 0 }
  );

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 capitalize">{brand.name}</h1>
        <p className="text-gray-700"><strong>Country:</strong> {brand.country}</p>
        <p className="text-gray-700"><strong>Founded:</strong> {brand.founded || 'N/A'}</p>
      </div>
    </main>
  );
}
