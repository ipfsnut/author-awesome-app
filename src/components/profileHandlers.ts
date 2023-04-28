import { Author } from '.prisma/client';

export const updateAuthor = async (author: Author) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/authors/${author.id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(author),
		}
	);

	if (!response.ok) {
		throw new Error('Failed to update author');
	}

	const updatedAuthor = await response.json();

	return updatedAuthor;
};

export const deleteAuthor = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
		{
			method: 'DELETE',
		}
	);

	if (!response.ok) {
		throw new Error('Failed to delete author');
	}

	return true;
};
