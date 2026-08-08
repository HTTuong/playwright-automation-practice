import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing - GET requests', () => {
  test('GET posts and return status 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.status()).toBe(200);
  });

  test('GET posts and check reponses format', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    const body = await response.json();

    expect(body.length).toBe(100);
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('userId');
  });

  test('GET 1 post by id', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });

  test('GET post, not found and return 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/9999`);
    expect(response.status()).toBe(404);
  });

  test('GET users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.length).toBe(10); // luôn cố định 10 user
    expect(body[0]).toHaveProperty('email');
  });
});