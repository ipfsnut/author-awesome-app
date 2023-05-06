import React, { useEffect, useState } from 'react';
import { Book } from '@prisma/client';

type BookViewProps = {
	bookId: string;
};

const BookView: React.FC<BookViewProps> = ({ bookId }) => {
	const [book, setBook] = useState<Book | null>(null);

	useEffect(() => {
		const fetchBook = async () => {
			const response = await fetch(`/api/books/${bookId}`);
			const data = await response.json();
			setBook(data.book);
		};

		fetchBook();
	}, [bookId]);

	if (!book) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{book.title}</h1>
			<img src={book.coverUrl} alt={book.title} />
			<p>Author: {book.AuthorName}</p>
			{/* Add more fields as needed */}
		</div>
	);
};

export default BookView;
