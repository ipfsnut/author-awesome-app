import { createTRPCRouter } from 'src/server/api/trpc';
//import { booksRouter } from './routers/books';
import { exampleRouter } from './routers/example';
import { postsRouter } from './routers/posts';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	//	books: booksRouter,
	example: exampleRouter,
	posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
