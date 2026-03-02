import { Metadata } from 'next';
import { getBrandInfo, getModelInfo, getYearInfo, getPricing, getReviews, safeFetch } from '@/lib/api';
import { generateSafeMetadata } from '@/lib/seo';

export const revalidate = 3600;

type Props = {
  params: Promise<{ brandSlug: string; modelSlug: string; year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brandSlug, modelSlug, year } = await params;
  
  const [brandInfo, modelInfo, yearInfo] = await Promise.all([
    safeFetch(() => getBrandInfo(brandSlug), null),
    safeFetch(() => getModelInfo(modelSlug), null),
    safeFetch(() => getYearInfo(brandSlug, modelSlug, year), null),
  ]);
  
  return generateSafeMetadata({
    brandSlug,
    modelSlug,
    year,
    brandInfo,
    modelInfo,
    yearInfo,
  });
}

export default async function YearPage({ params }: Props) {
  const { brandSlug, modelSlug, year } = await params;

  const [brand, model, yearInfo, pricing, reviews] = await Promise.all([
    safeFetch(() => getBrandInfo(brandSlug), { name: brandSlug, country: 'N/A', founded: 0 }),
    safeFetch(() => getModelInfo(modelSlug), { name: modelSlug, category: 'N/A', bodyType: 'N/A' }),
    safeFetch(() => getYearInfo(brandSlug, modelSlug, year), { year, engine: 'N/A', horsepower: 'N/A', transmission: 'N/A' }),
    safeFetch(() => getPricing(brandSlug, modelSlug, year), { msrp: 'N/A', used: 'N/A', currency: 'USD' }),
    safeFetch(() => getReviews(brandSlug, modelSlug, year), { rating: 0, totalReviews: 0, summary: 'N/A' }),
  ]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {year} {brand.name} {model.name}
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Brand Information</h2>
            <p className="text-gray-700"><strong>Name:</strong> {brand.name}</p>
            <p className="text-gray-700"><strong>Country:</strong> {brand.country}</p>
            <p className="text-gray-700"><strong>Founded:</strong> {brand.founded || 'N/A'}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Model Information</h2>
            <p className="text-gray-700"><strong>Model:</strong> {model.name}</p>
            <p className="text-gray-700"><strong>Category:</strong> {model.category}</p>
            <p className="text-gray-700"><strong>Body Type:</strong> {model.bodyType}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <p className="text-gray-700"><strong>Year:</strong> {yearInfo.year}</p>
            <p className="text-gray-700"><strong>Engine:</strong> {yearInfo.engine}</p>
            <p className="text-gray-700"><strong>Horsepower:</strong> {yearInfo.horsepower}</p>
            <p className="text-gray-700"><strong>Transmission:</strong> {yearInfo.transmission}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
            <p className="text-gray-700"><strong>MSRP:</strong> {pricing.msrp}</p>
            <p className="text-gray-700"><strong>Used Price:</strong> {pricing.used}</p>
            <p className="text-gray-700"><strong>Currency:</strong> {pricing.currency}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Reviews & Ratings</h2>
            <p className="text-gray-700"><strong>Rating:</strong> {reviews.rating}/5.0</p>
            <p className="text-gray-700"><strong>Total Reviews:</strong> {reviews.totalReviews}</p>
            <p className="text-gray-700"><strong>Summary:</strong> {reviews.summary}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
