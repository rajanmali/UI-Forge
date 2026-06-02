import { http, HttpResponse } from 'msw';
import type { Post, User } from '../store/api';

const BASE = 'https://jsonplaceholder.typicode.com';

export const MOCK_POSTS: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  userId: (i % 10) + 1,
  title: `Post title ${i + 1}`,
  body: `Post body ${i + 1}`,
}));

export const MOCK_USERS: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  username: `user${i + 1}`,
  website: `user${i + 1}.example.com`,
}));

export const handlers = [
  http.get(`${BASE}/posts`, () => HttpResponse.json(MOCK_POSTS)),

  http.get(`${BASE}/posts/:id`, ({ params }) => {
    const post = MOCK_POSTS.find((p) => p.id === Number(params.id));
    if (!post) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(post);
  }),

  http.get(`${BASE}/users`, () => HttpResponse.json(MOCK_USERS)),

  http.post(`${BASE}/posts`, async ({ request }) => {
    const body = (await request.json()) as Partial<Post>;
    const created: Post = {
      id: 101,
      userId: body.userId ?? 1,
      title: body.title ?? '',
      body: body.body ?? '',
    };
    return HttpResponse.json(created, { status: 201 });
  }),
];
