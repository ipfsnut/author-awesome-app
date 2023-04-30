import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const booksRouter = createTRPCRouter({
	getAllBooks: publicProcedure.query(async ({ ctx }) => {
		const books = await ctx.prisma.book.findMany();
		return books;
	}),
});
