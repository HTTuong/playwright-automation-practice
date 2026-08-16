import { test, expect } from '../fixtures/pages.fixture';

const sortCases = [
  {
    option: 'lohi',
    description: 'Price (low to high)',
    checkFn: (prices: number[]) => {
      const sorted = [...prices].sort((a, b) => a - b);
      return JSON.stringify(prices) === JSON.stringify(sorted);
    },
  },
  {
    option: 'hilo',
    description: 'Price (high to low)',
    checkFn: (prices: number[]) => {
      const sorted = [...prices].sort((a, b) => b - a);
      return JSON.stringify(prices) === JSON.stringify(sorted);
    },
  },
];

for (const { option, description, checkFn } of sortCases) {
  test(`Sort with ${description} return sorted price`, async ({ loggedInPage }) => {
    await loggedInPage.sortBy(option);
    const prices = await loggedInPage.getAllItemPrices();
    expect(checkFn(prices)).toBeTruthy();
  });
}

const nameSortCases = [
  { option: 'az', description: 'Name (A to Z)' },
  { option: 'za', description: 'Name (Z to A)' },
];

for (const { option, description } of nameSortCases) {
  test(`Sort by ${description}`, async ({ loggedInPage }) => {
    await loggedInPage.sortBy(option);
    const names = await loggedInPage.getAllItemNames();
    const sorted = [...names].sort();
    if (option === 'za') sorted.reverse();
    expect(names).toEqual(sorted);
  });
}