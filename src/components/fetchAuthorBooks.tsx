import { PrismaClient } from '@prisma/client';
import { BookProps } from '../components/Book';

const prisma = new PrismaClient();

export default async function fetchAuthorBooks(
	authorId: string
): Promise<BookProps[]> {
	const authorWithBooks = await prisma.author.findUnique({
		where: {
			id: authorId,
		},
		include: {
			books: true,
		},
	});

	if (!authorWithBooks) {
		throw new Error(`Author with ID "${authorId}" not found`);
	}

	const books = authorWithBooks.books.map((book) => ({
		id: book.id,
		title: book.title,
		author: {
			id: authorWithBooks.id,
			firstName: authorWithBooks.firstName,
			lastName: authorWithBooks.lastName,
		},
		imageUrl: book.coverUrl,
		description: book.description ?? '',
	}));

	await prisma.$disconnect();

	return books;
}
