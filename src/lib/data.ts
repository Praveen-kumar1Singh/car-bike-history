export const brands = [
  {
    slug: 'toyota',
    models: [
      { slug: 'fortuner', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'camry', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'corolla', years: [2020, 2021, 2022, 2023, 2024] },
    ],
  },
  {
    slug: 'honda',
    models: [
      { slug: 'civic', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'accord', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'cr-v', years: [2020, 2021, 2022, 2023, 2024] },
    ],
  },
  {
    slug: 'ford',
    models: [
      { slug: 'mustang', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'f-150', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'explorer', years: [2020, 2021, 2022, 2023, 2024] },
    ],
  },
  {
    slug: 'bmw',
    models: [
      { slug: '3-series', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: '5-series', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'x5', years: [2020, 2021, 2022, 2023, 2024] },
    ],
  },
  {
    slug: 'mercedes',
    models: [
      { slug: 'c-class', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'e-class', years: [2020, 2021, 2022, 2023, 2024] },
      { slug: 'gle', years: [2020, 2021, 2022, 2023, 2024] },
    ],
  },
];

export function getAllBrands() {
  return brands;
}

export function getAllModels() {
  return brands.flatMap(brand =>
    brand.models.map(model => ({
      brandSlug: brand.slug,
      modelSlug: model.slug,
    }))
  );
}

export function getAllYears() {
  return brands.flatMap(brand =>
    brand.models.flatMap(model =>
      model.years.map(year => ({
        brandSlug: brand.slug,
        modelSlug: model.slug,
        year,
      }))
    )
  );
}
