import { createTRPCRouter } from 'src/server/api/trpc';

import { postsRouter } from './routers/posts';

import { booksRouter } from './routers/books';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	//	books: booksRouter,
	posts: postsRouter,
	books: booksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
