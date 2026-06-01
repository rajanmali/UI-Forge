import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  website: string;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Post', id }],
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    createPost: builder.mutation<Post, NewPost>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      // JSONPlaceholder echoes the POST back — optimistically prepend to cache
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const optimisticId = Date.now();
        const patch = dispatch(
          api.util.updateQueryData('getPosts', undefined, (draft) => {
            draft.unshift({ id: optimisticId, ...newPost });
          }),
        );
        try {
          const { data: created } = await queryFulfilled;
          // Replace optimistic entry with the server response id
          dispatch(
            api.util.updateQueryData('getPosts', undefined, (draft) => {
              const idx = draft.findIndex((p) => p.id === optimisticId);
              if (idx !== -1) draft[idx].id = created.id;
            }),
          );
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useCreatePostMutation,
} = api;
