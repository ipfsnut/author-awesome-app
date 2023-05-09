import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from 'src/server/api/trpc';
import { PrismaClient } from '@prisma/client';

import { filterUserForClient } from 'src/server/helpers/filterUserForClient';
import type { Book } from '@prisma/client';

export const booksRouter = createTRPCRouter({
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const book = await ctx.prisma.book.findUnique({
				where: { id: +input.id },
			});

			if (!book) throw new TRPCError({ code: 'NOT_FOUND' });

			return book;
		}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		try {
			const books = await ctx.prisma.book.findMany({
				take: 100,
				orderBy: [{ createdAt: 'desc' }],
			});

			console.log('Books fetched:', books); // Add this line to log the fetched books
			return books;
		} catch (error) {
			console.error('Error in getAll route:', error);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Error fetching books',
			});
		}
	}),

	getBooksByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(({ ctx, input }) =>
			ctx.prisma.book.findMany({
				where: {
					id: +input.userId,
				},
				take: 100,
				orderBy: [{ createdAt: 'desc' }],
			})
		),

	getBooksByAuthorId: publicProcedure
		.input(z.object({ authorId: z.string() }))
		.query(async ({ ctx, input }) => {
			const books = await ctx.prisma.book.findMany({
				where: {
					authorId: input.authorId,
				},
				take: 100,
				orderBy: [{ createdAt: 'desc' }],
			});

			return books;
		}),

	add: privateProcedure
		.input(
			z.object({
				title: z.string().min(1).max(255),
				coverUrl: z.string().url(),
				AuthorName: z.string().min(1).max(255),
				external_resource: z.string().nullable(),
				metadata: z.string().nullable(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const authorId = ctx.userId;

			const book = await ctx.prisma.book.create({
				data: {
					authorId,
					title: input.title,
					coverUrl: input.coverUrl,
					AuthorName: input.AuthorName,
					external_resource: input.external_resource,
					metadata: input.metadata,
					createdAt: new Date(),
				},
			});

			return book;
		}),
});
