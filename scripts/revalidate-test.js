// Test script for on-demand revalidation
// Run with: node scripts/revalidate-test.js

const BASE_URL = 'http://localhost:3000';

async function revalidate(type, brandSlug, modelSlug, year) {
  try {
    const response = await fetch(`${BASE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        brandSlug,
        modelSlug,
        year,
      }),
    });

    const data = await response.json();
    console.log('Revalidation response:', data);
    return data;
  } catch (error) {
    console.error('Revalidation failed:', error);
  }
}

// Example 1: Revalidate a brand
console.log('Example 1: Revalidating brand "toyota"');
revalidate('brand', 'toyota');

// Example 2: Revalidate a model
console.log('\nExample 2: Revalidating model "civic"');
revalidate('model', null, 'civic');

// Example 3: Revalidate a specific year page
console.log('\nExample 3: Revalidating year page "toyota/fortuner/2023"');
revalidate('year', 'toyota', 'fortuner', '2023');

// Example 4: Revalidate pricing data
console.log('\nExample 4: Revalidating pricing for "honda/civic/2024"');
revalidate('pricing', 'honda', 'civic', '2024');

// Example 5: Revalidate reviews
console.log('\nExample 5: Revalidating reviews for "bmw/3-series/2023"');
revalidate('reviews', 'bmw', '3-series', '2023');
