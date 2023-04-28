import { BookProps } from './BookComponent';

export async function fetchAuthorBooksFromAPI(
	authorId: string
): Promise<BookProps[]> {
	const res = await fetch(`/api/authorBooks?authorId=${authorId}`);

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error);
	}

	return res.json();
}

// Define the type for the function
type FetchAuthorBooksFn = (authorId: string) => Promise<BookProps[]>;

// Export the function with the defined type

export default fetchAuthorBooksFromAPI;
