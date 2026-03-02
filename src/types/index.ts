export interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  type: 'car' | 'bike' | 'both';
}

export interface Model {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  description?: string;
  image?: string;
}

export interface Year {
  year: number;
  modelId: string;
  specifications?: Record<string, string>;
  description?: string;
}

export interface PageParams {
  brandSlug?: string;
  modelSlug?: string;
  year?: string;
}
