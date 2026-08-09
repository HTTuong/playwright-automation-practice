import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing - headers & params', () => {
    test('Reponse with correct content-type json' , async ({request}) => {
         const response = await request.get(`${BASE_URL}/posts/1`);
        expect(response.headers()['content-type']).toContain('application/json');
    })

    test('Filter comments by postId with query param', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/comments`, {
            params: { postId: '1' },
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        for (const comment of body) {
            expect(comment.postId).toBe(1);
        }
    });

})