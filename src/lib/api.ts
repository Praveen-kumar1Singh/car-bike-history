import { unstable_cache } from 'next/cache';

// Mock API functions with simulated delays and failures

type BrandInfo = {
  name: string;
  country: string;
  founded: number;
};

type ModelInfo = {
  name: string;
  category: string;
  bodyType: string;
};

type YearInfo = {
  year: string;
  engine: string;
  horsepower: string;
  transmission: string;
};

type Pricing = {
  msrp: string;
  used: string;
  currency: string;
};

type Reviews = {
  rating: number;
  totalReviews: number;
  summary: string;
};

// Timeout wrapper
export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Simulate network delay and random failures
async function simulateAPI<T>(data: T, failureRate = 0.1): Promise<T> {
  const delay = Math.floor(Math.random() * 250) + 50;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (Math.random() < failureRate) {
    throw new Error('API failure');
  }
  
  return data;
}

// Resilient fetch wrapper
export async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await withTimeout(fn(), 2000);
  } catch {
    return fallback;
  }
}

// API 1: Get brand information with cache tagging
export const getBrandInfo = unstable_cache(
  async (brandSlug: string): Promise<BrandInfo> => {
    return simulateAPI({
      name: brandSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      country: 'Japan',
      founded: 1948,
    });
  },
  ['brand'],
  {
    tags: (brandSlug: string) => [`brand-${brandSlug}`],
    revalidate: 3600,
  }
);

// API 2: Get model information with cache tagging
export const getModelInfo = unstable_cache(
  async (modelSlug: string): Promise<ModelInfo> => {
    return simulateAPI({
      name: modelSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: 'Sedan',
      bodyType: '4-door',
    });
  },
  ['model'],
  {
    tags: (modelSlug: string) => [`model-${modelSlug}`],
    revalidate: 3600,
  }
);

// API 3: Get year-specific information with cache tagging
export const getYearInfo = unstable_cache(
  async (brandSlug: string, modelSlug: string, year: string): Promise<YearInfo> => {
    return simulateAPI({
      year,
      engine: '2.0L I4 Turbo',
      horsepower: '252 hp',
      transmission: 'CVT Automatic',
    });
  },
  ['year'],
  {
    tags: (brandSlug: string, modelSlug: string, year: string) => [`year-${brandSlug}-${modelSlug}-${year}`],
    revalidate: 3600,
  }
);

// API 4: Get pricing information with cache tagging
export const getPricing = unstable_cache(
  async (brandSlug: string, modelSlug: string, year: string): Promise<Pricing> => {
    return simulateAPI({
      msrp: '$28,500',
      used: '$24,000',
      currency: 'USD',
    });
  },
  ['pricing'],
  {
    tags: (brandSlug: string, modelSlug: string, year: string) => [`pricing-${brandSlug}-${modelSlug}-${year}`],
    revalidate: 3600,
  }
);

// API 5: Get reviews and ratings with cache tagging
export const getReviews = unstable_cache(
  async (brandSlug: string, modelSlug: string, year: string): Promise<Reviews> => {
    return simulateAPI({
      rating: 4.5,
      totalReviews: 1247,
      summary: 'Excellent reliability and fuel efficiency',
    });
  },
  ['reviews'],
  {
    tags: (brandSlug: string, modelSlug: string, year: string) => [`reviews-${brandSlug}-${modelSlug}-${year}`],
    revalidate: 3600,
  }
);
