import { PrismaClient as _PrismaClient } from '@prisma/client';

declare global {
	const prisma: _PrismaClient;
}
