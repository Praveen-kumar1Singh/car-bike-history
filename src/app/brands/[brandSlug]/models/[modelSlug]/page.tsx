import { Metadata } from 'next';
import { getBrandInfo, getModelInfo, safeFetch } from '@/lib/api';
import { generateSafeMetadata } from '@/lib/seo';

export const revalidate = 3600;

type Props = {
  params: Promise<{ brandSlug: string; modelSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug, modelSlug } = await params;
  
  const [brandInfo, modelInfo] = await Promise.all([
    safeFetch(() => getBrandInfo(brandSlug), null),
    safeFetch(() => getModelInfo(modelSlug), null),
  ]);
  
  return generateSafeMetadata({
    brandSlug,
    modelSlug,
    brandInfo,
    modelInfo,
  });
}

export default async function ModelPage({ params }: Props) {
  const { brandSlug, modelSlug } = await params;

  const [brand, model] = await Promise.all([
    safeFetch(() => getBrandInfo(brandSlug), { name: brandSlug, country: 'N/A', founded: 0 }),
    safeFetch(() => getModelInfo(modelSlug), { name: modelSlug, category: 'N/A', bodyType: 'N/A' }),
  ]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {brand.name} {model.name}
        </h1>
        <p className="text-gray-700"><strong>Category:</strong> {model.category}</p>
        <p className="text-gray-700"><strong>Body Type:</strong> {model.bodyType}</p>
      </div>
    </main>
  );
}
