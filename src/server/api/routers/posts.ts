import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from 'src/server/api/trpc';

import { filterUserForClient } from 'src/server/helpers/filterUserForClient';
import type { Post } from '@prisma/client';

const addUserDataToPosts = async (posts: Post[]) => {
	const userIds = posts.map((post) => post.authorId);

	// Fetch users in a single call, using clerkClient.users.getUserList
	const userList = await clerkClient.users.getUserList({ userId: userIds });
	const users = userList.map(filterUserForClient);

	return posts.map((post) => {
		const author = users.find((user) => user.id === post.authorId);

		if (!author) {
			console.error('AUTHOR NOT FOUND', post);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
			});
		}
		if (!author.username) {
			// Use the ExternalUsername
			if (!author.externalUsername) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Author has no GitHub Account: ${author.id}`,
				});
			}
			author.username = author.externalUsername;
		}
		return {
			post,
			author: {
				...author,
				username: author.username ?? '(username not found)',
			},
		};
	});
};

export const postsRouter = createTRPCRouter({
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findUnique({
				where: { id: input.id },
			});

			if (!post) throw new TRPCError({ code: 'NOT_FOUND' });

			return (await addUserDataToPosts([post]))[0];
		}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.prisma.post.findMany({
			take: 100,
			orderBy: [{ createdAt: 'desc' }],
		});

		return addUserDataToPosts(posts);
	}),

	getPostsByUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(({ ctx, input }) =>
			ctx.prisma.post
				.findMany({
					where: {
						authorId: input.userId,
					},
					take: 100,
					orderBy: [{ createdAt: 'desc' }],
				})
				.then(addUserDataToPosts)
		),

	create: privateProcedure
		.input(
			z.object({
				content: z.string().emoji('Only emojis are allowed').min(1).max(280),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const authorId = ctx.userId;

			const post = await ctx.prisma.post.create({
				data: {
					authorId,
					content: input.content,
				},
			});

			return post;
		}),
});
