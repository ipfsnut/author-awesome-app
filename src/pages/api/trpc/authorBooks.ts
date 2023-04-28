// src/pages/api/authorBooks.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchAuthorBooksFromAPI } from 'src/components/fetchAuthorBooksFromAPI';
import { BookProps } from '~/components/BookComponent';

export default async (
	req: NextApiRequest,
	res: NextApiResponse<BookProps[] | { error: string }>
) => {
	const { authorId } = req.query;

	if (!authorId || typeof authorId !== 'string') {
		res
			.status(400)
			.json({ error: 'authorId is required and should be a string.' });
		return;
	}

	try {
		const books = await fetchAuthorBooksFromAPI(authorId);
		res.status(200).json(books);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred';
		res.status(500).json({ error: errorMessage });
	}
};
