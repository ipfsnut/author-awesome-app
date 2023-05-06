import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from 'src/server/api/root';
import { prisma } from 'src/server/db';
import superjson from 'superjson';

export const generateSSGHelper = () =>
	createProxySSGHelpers({
		router: appRouter,
		ctx: { prisma, userId: null },
		transformer: superjson, // optional - adds superjson serialization
	});
