import { NextApiRequest, NextApiResponse } from 'next';
import { BookProps } from 'src/components/BookComponent';
import { api } from 'src/utils/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (
	req: NextApiRequest,
	res: NextApiResponse<BookProps | { error: string }>
) => {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	const { title, coverUrl, authorId, authorName } = req.body;

	if (!title || !coverUrl || !authorId || !authorName) {
		res.status(400).json({ error: 'All fields are required.' });
		return;
	}

	try {
		const newBook = await prisma.book.create({
			data: {
				title,
				coverUrl: coverUrl,
				authorId: authorId,
				AuthorName: authorName,
			},
		});

		res.status(201).json(newBook);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
};
