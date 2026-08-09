import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing - CRUD operations', () => {
    test('POST create new post and return status 201' , async ({page, request}) => {
        const response = await request.post(`${BASE_URL}/posts`, {
            data: {
                title: 'Learn Playwright',
                body: 'Day 5 - API testing',
                userId: 1,
            },
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.title).toBe('Learn Playwright');
        expect(body).toHaveProperty('id');
    })

    test('PUT update post and return status 200', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/posts/1`, {
            data: {
                id: 1,
                title: 'Title was updated',
                body: 'New content',
                userId: 1,
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.title).toBe('Title was updated');
    });

    test('DELETE post return status 200', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/posts/1`);
        expect(response.status()).toBe(200);
    });

    test('POST missing field but still recieve response 201', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/posts`, {
            data: { title: 'Only title' },
        });
        expect(response.status()).toBe(201);
    });

})