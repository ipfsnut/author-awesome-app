import { useState, useEffect } from 'react';

interface Book {
	id: string;
	title: string;
}

const useAuthorBooks = (authorId: string) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchBooks = async () => {
			setIsLoading(true);
			const res = await fetch(`/api/books/authorBooks?authorId=${authorId}`);
			const data = await res.json();
			setBooks(data);
			setIsLoading(false);
		};

		fetchBooks();
	}, [authorId]);

	return { books, isLoading };
};

export { useAuthorBooks };
